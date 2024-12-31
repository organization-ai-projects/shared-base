export default {
  branches: [
    { name: 'main' },

    { name: 'develop', prerelease: 'beta' },

    {
      name: 'feature/*',
      prerelease: '${name.replace(/^feature\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}',
    },

    {
      name: 'fix/*',
      prerelease: '${name.replace(/^fix\\//g, "").replace(/[^a-zA-Z0-9-]/g, "-")}',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',

    '@semantic-release/release-notes-generator',

    '@semantic-release/changelog',

    '@semantic-release/npm',

    '@semantic-release/github',

    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
  ],
};
