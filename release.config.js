module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: [
          'README.md',
          'README_CN.md',
          'CHANGELOG.md',
          'LICENSE',
          'sources/**',
          'layout/**',
          '__config.yml'
        ],
        message:
          'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
}
