#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const instructionsPath = path.join('.github', 'copilot-instructions.md')

const requiredHeadings = [
  '## Quick Do/Don\'t',
  '## 1) Tech stack and architecture',
  '## 3) Required screen composition pattern (data setup screens)',
  '## 4) MUI Grid v2 syntax (mandatory)',
  '## 6) getData and submitData conventions',
  '## 7) Service file pattern (required)',
  '## 8.2) Data-driven Autocomplete strategy (Data Setup)',
  '## 9) Theme and styling rules',
  '## 15) Troubleshooting-aware generation',
  '## 16) Output checklist for Copilot',
  '## 18) Review quality gates (before push)',
]

const requiredRules = [
  'Copilot Instructions for This Theme',
  'MainCard` + `CollapsibleSection` + `ValidatorForm',
  "import Grid from '@mui/material/Grid'",
  'Do not use deprecated Grid props',
  'service modules in `src/services`',
  'response.success',
  'Add code comments only when the logic is not obvious from the code itself.',
  'Do not leave commented-out code in generated output unless the user explicitly asks to keep it.',
]

if (!fs.existsSync(instructionsPath)) {
  console.error(`ERROR: Missing required file: ${instructionsPath}`)
  process.exit(1)
}

const content = fs.readFileSync(instructionsPath, 'utf8').trim()

if (!content) {
  console.error(`ERROR: ${instructionsPath} is empty.`)
  process.exit(1)
}

const missingHeadings = requiredHeadings.filter((heading) => !content.includes(heading))
const missingRules = requiredRules.filter((rule) => !content.includes(rule))

const missing = [
  ...missingHeadings.map((heading) => `Heading: ${heading}`),
  ...missingRules.map((rule) => `Rule: ${rule}`),
]

if (missing.length) {
  console.error('ERROR: Copilot instructions file is missing required sections:')
  for (const snippet of missing) {
    console.error(`  - ${snippet}`)
  }
  process.exit(1)
}
