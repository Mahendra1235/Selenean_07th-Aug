const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
  quiet: true
});

const {
  CONTACT_EMAIL,
  MAIL_FROM,
  isMailConfigured,
  handleContact
} = require("./lib/mail");

const app = express();
const PORT = process.env.PORT || 5000;
const BUILD_DIR = path.join(__dirname, "build");
const INDEX_FILE = path.join(BUILD_DIR, "index.html");
const hasBuild = fs.existsSync(INDEX_FILE);

const corsOrigins = String(process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);

if (corsOrigins.length) {
  app.use(
    cors({
      origin: corsOrigins.includes("*") ? true : corsOrigins,
      methods: ["GET", "POST", "OPTIONS"]
    })
  );
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.post("/api/contact", async (req, res, next) => {
  try {
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (error) {
        body = null;
      }
    }

    const result = await handleContact(body);
    res.status(result.status).json(result.body);
  } catch (error) {
    next(error);
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    recipient: CONTACT_EMAIL,
    sender: MAIL_FROM,
    mailConfigured: isMailConfigured(),
    buildReady: hasBuild
  });
});

if (hasBuild) {
  app.use(
    express.static(BUILD_DIR, {
      index: false,
      maxAge: "1h",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      }
    })
  );

  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }

    if (req.path.startsWith("/api/")) {
      return next();
    }

    res.sendFile(INDEX_FILE);
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "API is running, but the React build folder was not found. Run \"npm run build\" and upload the build folder.",
      mailConfigured: isMailConfigured()
    });
  });
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found."
  });
});

app.use((error, req, res, next) => {
  console.error("Request failed:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  if (error.type === "entity.parse.failed") {
    res.status(400).json({
      success: false,
      message: "Invalid request body."
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Contact recipient: ${CONTACT_EMAIL}`);
  console.log(`Mail configured: ${isMailConfigured()}`);
  console.log(`React build found: ${hasBuild}`);

  if (!isMailConfigured()) {
    console.warn(
      "Mail is not configured. Set TENANT_ID, CLIENT_ID, CLIENT_SECRET and MAIL_FROM in the environment."
    );
  }
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
