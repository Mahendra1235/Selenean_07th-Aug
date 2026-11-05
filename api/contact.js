const { handleContact } = require("../lib/mail");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
    return;
  }

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
};
