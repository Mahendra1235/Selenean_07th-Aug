const { CONTACT_EMAIL, isMailConfigured } = require("../lib/mail");

module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    recipient: CONTACT_EMAIL,
    mailConfigured: isMailConfigured()
  });
};
