const { join } = require("path");

/** Keep Chromium inside the project so Vercel's build cache preserves it. */
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
