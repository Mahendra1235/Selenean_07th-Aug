const originalEmitWarning = process.emitWarning;

process.emitWarning = function emitWarning(warning, ...args) {
  const options = args[0];
  const code =
    (warning && typeof warning === "object" && warning.code) ||
    (options && typeof options === "object" && options.code) ||
    (typeof options === "string" && /^DEP\d+$/.test(options)
      ? options
      : typeof args[1] === "string"
        ? args[1]
        : undefined);

  if (code === "DEP0060") {
    return;
  }

  return originalEmitWarning.call(this, warning, ...args);
};

require("react-scripts/scripts/start");
