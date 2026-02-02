module.exports = {
  // Run Biome check and format on TypeScript and JavaScript files (with --unsafe to auto-fix)
  "*.{js,jsx,ts,tsx}": ["npx biome check --write --unsafe"],

  // Run Biome format on JSON, CSS, and Markdown files
  "*.{json,css,md}": ["npx biome format --write"],
};
