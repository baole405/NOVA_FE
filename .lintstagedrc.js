module.exports = {
  // Run Biome check and format on TypeScript and JavaScript files
  "*.{js,jsx,ts,tsx}": ["npx biome check --write"],

  // Run Biome format on JSON, CSS, and Markdown files
  "*.{json,css,md}": ["npx biome format --write"],
};
