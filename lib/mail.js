const fs = require("fs");
const path = require("path");
const https = require("https");
const { ConfidentialClientApplication } = require("@azure/msal-node");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  quiet: true
});

const readEnv = (name, fallback = "") =>
  String(process.env[name] || fallback).trim();

const TENANT_ID = readEnv("TENANT_ID");
const CLIENT_ID = readEnv("CLIENT_ID");
const CLIENT_SECRET = readEnv("CLIENT_SECRET");
const MAIL_FROM = readEnv("MAIL_FROM");
const CONTACT_EMAIL = readEnv("CONTACT_EMAIL") || MAIL_FROM;
const SITE_URL = readEnv("SITE_URL", "https://seleneantech.com").replace(
  /\/+$/,
  ""
);
const CONTACT_TIMEZONE = readEnv("CONTACT_TIMEZONE", "Asia/Kolkata");
const LOGO_CONTENT_ID = "selenean-logo";

const LOGO_CANDIDATES = [
  {
    file: "Selenean-White.jpg",
    name: "Selenean-White.jpg",
    contentType: "image/jpeg"
  },
  {
    file: "selenean-logo.png",
    name: "selenean-logo.png",
    contentType: "image/png"
  }
];

let logoCache;

function loadLogo() {
  if (logoCache !== undefined) {
    return logoCache;
  }

  for (const candidate of LOGO_CANDIDATES) {
    try {
      const logoPath = path.join(__dirname, candidate.file);

      if (fs.existsSync(logoPath)) {
        logoCache = {
          ...candidate,
          base64: fs.readFileSync(logoPath).toString("base64")
        };

        return logoCache;
      }
    } catch (error) {
      console.warn(`Could not load email logo ${candidate.file}:`, error.message);
    }
  }

  console.warn("No email logo found. Emails will be sent without the logo.");
  logoCache = null;

  return logoCache;
}

const isMailConfigured = () =>
  Boolean(TENANT_ID && CLIENT_ID && CLIENT_SECRET && MAIL_FROM);

let client;

function getClient() {
  if (!client) {
    client = new ConfidentialClientApplication({
      auth: {
        clientId: CLIENT_ID,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
        clientSecret: CLIENT_SECRET
      }
    });
  }

  return client;
}

function graphRequest(accessToken, requestPath, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);

    const request = https.request(
      {
        hostname: "graph.microsoft.com",
        path: requestPath,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        }
      },
      (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve();
            return;
          }

          reject(
            new Error(
              `Microsoft Graph ${response.statusCode}: ${data.slice(0, 500)}`
            )
          );
        });
      }
    );

    request.on("error", reject);
    request.setTimeout(20000, () => {
      request.destroy(new Error("Microsoft Graph request timed out."));
    });

    request.write(payload);
    request.end();
  });
}

async function sendMail({ subject, text, html, from, replyTo }) {
  if (!isMailConfigured()) {
    throw new Error(
      "Mail is not configured. Set TENANT_ID, CLIENT_ID, CLIENT_SECRET and MAIL_FROM."
    );
  }

  const token = await getClient().acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"]
  });

  if (!token || !token.accessToken) {
    throw new Error("Microsoft Graph did not return an access token.");
  }

  const senderEmail = String(from.email || "").trim();
  const internalDomains = readEnv(
    "INTERNAL_DOMAINS",
    MAIL_FROM.split("@").pop()
  )
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
  const senderDomain = senderEmail.split("@").pop().toLowerCase();
  const isInternal = Boolean(senderEmail) && internalDomains.includes(senderDomain);
  const sendAs = isInternal ? senderEmail : MAIL_FROM;
  const logo = loadLogo();

  const payloadFor = (address) => ({
    message: {
      subject,
      body: { contentType: "HTML", content: html },
      from: {
        emailAddress: { address, name: from.name || address }
      },
      toRecipients: [{ emailAddress: { address: CONTACT_EMAIL } }],
      replyTo: [
        { emailAddress: { address: replyTo.email, name: replyTo.name } }
      ],
      attachments: logo
        ? [
            {
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: logo.name,
              contentType: logo.contentType,
              contentBytes: logo.base64,
              contentId: LOGO_CONTENT_ID,
              isInline: true
            }
          ]
        : []
    },
    saveToSentItems: false
  });

  try {
    await graphRequest(
      token.accessToken,
      `/v1.0/users/${encodeURIComponent(sendAs)}/sendMail`,
      payloadFor(sendAs)
    );
  } catch (error) {
    if (
      !isInternal ||
      !/ErrorSendAsDenied|ErrorInvalidUser|ResourceNotFound|MailboxNotEnabledForRESTAPI/i.test(
        error.message
      )
    ) {
      throw error;
    }

    console.warn(
      `Could not send as ${senderEmail}; sending from ${MAIL_FROM} with Reply-To ${replyTo.email}.`
    );
    await graphRequest(
      token.accessToken,
      `/v1.0/users/${encodeURIComponent(MAIL_FROM)}/sendMail`,
      payloadFor(MAIL_FROM)
    );
  }

  return text;
}

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

async function handleContact(body) {
  const { name, email, subject, message } = body || {};

  if (!name || !email || !message) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Please fill in all required fields."
      }
    };
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanSubject = String(subject || "General Enquiry").trim();
  const cleanMessage = String(message).trim();

  if (
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanSubject.length > 150 ||
    cleanMessage.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Please enter valid form details."
      }
    };
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br>");
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: CONTACT_TIMEZONE,
    dateStyle: "medium",
    timeStyle: "short"
  });
  const siteLabel = SITE_URL.replace(/^https?:\/\//, "");
  const encodedEmail = encodeURIComponent(cleanEmail);
  const replyHref = `mailto:${encodedEmail}?subject=${encodeURIComponent(
    `Re: ${cleanSubject}`
  )}`;
  const logo = loadLogo();
  const logoMarkup = logo
    ? `<img src="cid:${LOGO_CONTENT_ID}" alt="Selenean Technologies" width="180" style="display:block;width:180px;max-width:60%;height:auto;border:0;outline:none;text-decoration:none;">`
    : `<p style="margin:0;font-size:22px;font-weight:700;letter-spacing:2px;color:#071a4d;">SELENEAN</p>`;

  const detailRow = (label, value) => `
    <tr>
      <td style="width:110px;padding:10px 0;border-bottom:1px solid #eef3f9;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#9aa7b8;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eef3f9;font-size:15px;line-height:1.5;color:#102544;vertical-align:top;">${value}</td>
    </tr>`;

  const html = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;background:#eef3f9;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(7,26,77,0.12);">
            <tr>
              <td style="height:6px;background:#16c6b5;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #e6edf6;">
                ${logoMarkup}
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#16c6b5;">Website Enquiry</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#071a4d;">New Contact Form Submission</h1>
                <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#5f6f83;">You have received a new enquiry from the Selenean website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  ${detailRow("Name", safeName)}
                  ${detailRow(
                    "Email",
                    `<a href="mailto:${encodedEmail}" style="color:#0c7ce5;text-decoration:none;">${safeEmail}</a>`
                  )}
                  ${detailRow("Subject", safeSubject)}
                  ${detailRow("Received", escapeHtml(submittedAt))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 0;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9aa7b8;">Message</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:18px 20px;background:#f7fbff;border-left:4px solid #16c6b5;border-radius:0 8px 8px 0;font-size:15px;line-height:1.7;color:#102544;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 32px 32px;">
                <a href="${replyHref}" style="display:inline-block;padding:12px 22px;background:#071a4d;border-radius:6px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Reply</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#071a4d;">
                <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;">Selenean Technologies</p>
                <p style="margin:4px 0 0;color:#c3d3ec;font-size:12px;line-height:1.6;">Sent from the contact form at <a href="${SITE_URL}" style="color:#16c6b5;text-decoration:none;">${siteLabel}</a>.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  try {
    await sendMail({
      subject: `New Enquiry: ${cleanSubject}`,
      text: `New contact form submission\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\nReceived: ${submittedAt}\n\n${cleanMessage}`,
      html,
      from: { name: cleanName, email: cleanEmail },
      replyTo: { name: cleanName, email: cleanEmail }
    });

    return {
      status: 200,
      body: {
        success: true,
        message: "Message sent successfully!"
      }
    };
  } catch (error) {
    console.error("Contact form send failed:", error.message);

    return {
      status: 502,
      body: {
        success: false,
        message: "Unable to send message. Please try again later."
      }
    };
  }
}

module.exports = {
  CONTACT_EMAIL,
  MAIL_FROM,
  isMailConfigured,
  sendMail,
  handleContact
};
