export default {
  branches: [
    { name: 'main' }, // Stable release branch
    { name: 'develop', prerelease: 'beta' }, // Beta releases from the develop branch
    {
      name: 'feature/*',
      prerelease: '${name.replace(/^feature\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}', // Pre-releases from feature branches
    },
    {
      name: 'fix/*',
      prerelease: '${name.replace(/^fix\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}', // Pre-releases from fix branches
    },
    { name: 'hotfix/*', prerelease: 'hotfix-${name.replace(/^hotfix\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}' }, // Support for hotfix branches
  ],
  plugins: [
    '@semantic-release/commit-analyzer', // Analyze commit messages for release type
    '@semantic-release/release-notes-generator', // Generate release notes
    '@semantic-release/changelog', // Update CHANGELOG.md
    '@semantic-release/npm', // Publish to npm registry
    '@semantic-release/github', // Create GitHub releases
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'], // Files to commit after release
        message: 'chore(release): ${nextRelease.version} [skip ci]', // Commit message
      },
    ],
  ],
};
