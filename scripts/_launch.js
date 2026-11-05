const { spawn } = require("child_process");
const path = require("path");

const cwd = path.join(__dirname, "..");
const child = spawn(process.execPath, ["server.js"], {
  cwd,
  detached: true,
  stdio: "ignore",
  windowsHide: true
});

child.unref();
console.log("server started pid", child.pid);
