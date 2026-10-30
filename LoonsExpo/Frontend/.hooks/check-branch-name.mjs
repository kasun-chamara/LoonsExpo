#!/usr/bin/env node

import { execSync } from 'node:child_process'

const allowedExactBranches = new Set(['main', 'development'])
const branchPatterns = [
  /^(feature|bugfix|hotfix|chore)\/(?:[a-z]+-\d+)-[a-z0-9]+(?:-[a-z0-9]+)*$/,
  /^release\/\d+\.\d+\.\d+$/,
]

const getCurrentBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
  } catch {
    console.error('ERROR: Unable to determine the current git branch.')
    process.exit(1)
  }
}

const branchName = getCurrentBranch()

if (branchName === 'HEAD') {
  process.exit(0)
}

const isAllowed =
  allowedExactBranches.has(branchName) || branchPatterns.some((pattern) => pattern.test(branchName))

if (!isAllowed) {
  console.error(`ERROR: Invalid branch name: ${branchName}`)
  console.error('Allowed formats:')
  console.error('  - main')
  console.error('  - development')
  console.error('  - feature/<jira-id>-<short-description>')
  console.error('  - bugfix/<jira-id>-<short-description>')
  console.error('  - hotfix/<jira-id>-<short-description>')
  console.error('  - chore/<jira-id>-<short-description>')
  console.error('  - release/<version>')
  console.error('Examples:')
  console.error('  - feature/jira-123-user-authentication')
  console.error('  - bugfix/jira-456-login-crash')
  console.error('  - hotfix/jira-789-security-patch')
  console.error('  - chore/jira-101-update-readme')
  console.error('  - release/1.2.0')
  process.exit(1)
}
