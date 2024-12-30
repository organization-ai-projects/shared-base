export default {
  branches: [
    // Stable branch for production-ready releases
    { name: 'main' },

    // Integration branch for features and fixes, with pre-release tags
    { name: 'develop', prerelease: 'beta' }, // Use 'beta' for pre-release versions (e.g., 1.0.0-beta.1)

    // Feature branches for new functionality, treated as pre-releases
    {
      name: 'feature/*',
      prerelease: '${name.replace(/^feature\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}',
    },

    // Fix branches for bug fixes, treated as pre-releases
    {
      name: 'fix/*',
      prerelease: '${name.replace(/^fix\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}',
    },
  ],
  plugins: [
    // Analyze commit messages to determine the next version
    '@semantic-release/commit-analyzer',

    // Generate release notes from commit history
    '@semantic-release/release-notes-generator',

    // Update and append to CHANGELOG.md with release details
    '@semantic-release/changelog',

    // Automatically publish the package to the npm registry
    '@semantic-release/npm',

    // Create a release on GitHub, including release notes and tags
    '@semantic-release/github',

    // Commit updated files (e.g., CHANGELOG.md, package.json) back to the repository
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md', // Updated changelog
          'package.json', // Updated version
          'pnpm-lock.yaml', // Lockfile for reproducible builds
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]', // Skip CI to prevent loops
      },
    ],
  ],
};
