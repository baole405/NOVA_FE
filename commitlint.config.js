module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "feature", // New feature
        "fix",
        "debug", // Bug fix
        "docs", // Documentation changes
        "style", // Code style changes (formatting, semicolons, etc)
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Adding or updating tests
        "build", // Build system or dependencies
        "ci", // CI configuration changes
        "chore", // Other changes (maintenance)
        "revert", // Revert previous commit
      ],
    ],
    "subject-case": [0], // Allow any case for subject
  },
};
