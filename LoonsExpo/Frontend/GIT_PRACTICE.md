# Project Git Workflow Guide

## Overview
This document outlines the Git version control strategy for this project, including branch management, naming conventions, and tagging practices. The goal is to ensure a clean, scalable, and collaborative development process. The `main` branch is protected and represents production-ready code.

## Git Branching Strategy
We use a Gitflow-inspired branching model with long-lived and short-lived branches to manage development, releases, and fixes.

### Core Branches
- **`main`**
  - Purpose: Production-ready code.
    - Pull requests (PRs) with at least one reviewer.
    - Passing CI/CD checks (tests, linters).
    - No force-pushes allowed.
  - Lifecycle: Long-lived, never deleted.

- **`development`**
  - Purpose: Production-ready code.
  - Protection: Protected to prevent direct commits. Merges require:
  - Purpose: Integration branch for features and fixes before they reach production.
  - Protection: Protected, but allows more flexibility for testing.
  - Lifecycle: Long-lived, never deleted.

### Supporting Branches
These are short-lived branches, deleted after merging via PR.

- **Feature Branches**
  - Purpose: development new features or enhancements.
  - Naming: `feature/<jira-id>-<short-description>` (e.g., `feature/jira-123-user-authentication`).
  - Workflow: Branch off `development`, merge back to `development` via PR.
  - Example: `git checkout -b feature/jira-123-user-authentication development`

- **Bugfix Branches**
  - Purpose: Fix bugs in the codebase.
  - Naming: `bugfix/<jira-id>-<short-description>` (e.g., `bugfix/jira-456-login-crash`).
  - Workflow: Branch off `development` (or `main` for critical production bugs), merge to `development` (or `main`) via PR.
  - Example: `git checkout -b bugfix/jira-456-login-crash development`

- **Hotfix Branches**
  - Purpose: Urgent fixes for production issues.
  - Naming: `hotfix/<jira-id>-<short-description>` (e.g., `hotfix/jira-789-security-patch`).
  - Workflow: Branch off `main`, merge to `main` and `development` via PR.
  - Example: `git checkout -b hotfix/jira-789-security-patch main`

- **Release Branches**
  - Purpose: Prepare a specific version for production release.
  - Naming: `release/<version>` (e.g., `release/1.2.0`).
  - Workflow: Branch off `development`, merge to `main` and `development` via PR.
  - Example: `git checkout -b release/1.2.0 development`

- **Chore Branches**
  - Purpose: Non-functional changes (e.g., refactoring, documentation).
  - Naming: `chore/<jira-id>-<short-description>` (e.g., `chore/jira-101-update-readme`).
  - Workflow: Branch off `development`, merge to `development` via PR.
  - Example: `git checkout -b chore/jira-101-update-readme development`

### Branch Naming Conventions
- Use **lowercase** and **hyphens** (e.g., `feature/jira-123-user-auth`).
- Include a lowercase **jira ticket id** for traceability.
- Keep descriptions short and descriptive.
- Prefix with branch type: `feature/`, `bugfix/`, `hotfix/`, `release/`, `chore/`.

## Tag Management
Tags mark specific commits for releases or milestones.

### Tag Naming Conventions
- **Releases**: Use semantic versioning (`v<major>.<minor>.<patch>`, e.g., `v1.2.3`).
- **Pre-releases**: Append a suffix (e.g., `v1.2.0-alpha.1`, `v1.2.0-beta.2`).
- **Milestones/Experiments**: Use descriptive prefixes (e.g., `milestone/sprint-10`, `experiment/new-ui`).

### Tag Workflow
- Create tags on `main` for production releases.
- Use annotated tags for metadata:
  ```bash
  git tag -a v1.2.3 -m "Release 1.2.3: Added user authentication"
  git push origin v1.2.3
  ```
- Protect tags in the Git platform to prevent deletion or modification.
- Treat tags as immutable; create a new tag for corrections (e.g., `v1.2.4`).

## Example Workflow
1. **Create a feature branch**:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/JIRA-123-user-authentication
   ```
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "JIRA-123: Implement user authentication"
   ```
3. **Push and create PR**:
   ```bash
   git push origin feature/JIRA-123-user-authentication
   ```
   - Open a PR targeting `development`.
   - Ensure CI/CD checks pass and assign reviewers.
4. **Merge PR**:
   - Use squash or merge commit (per team preference).
   - Delete the branch after merging.
5. **Prepare a release**:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b release/1.2.0
   git push origin release/1.2.0
   ```
   - Test and make minor fixes.
   - Merge to `main` and `development` via PR.
   - Tag the release:
     ```bash
     git checkout main
     git pull origin main
     git tag -a v1.2.0 -m "Release 1.2.0: Added user authentication"
     git push origin v1.2.0
     ```
6. **Delete the release branch**:
   ```bash
   git push origin --delete release/1.2.0
   ```

## Best Practices
- **Keep branches short-lived**: Merge and delete feature/bugfix branches regularly.
- **Use PR templates**: Include ticket IDs, descriptions, and testing steps.
- **Automate checks**: Use CI/CD for tests, linting, and deployment.
- **Resolve conflicts promptly**: Communicate with the team to avoid redundant work.
- **Clean up regularly**: Remove stale branches and unused tags (with team approval).
- **Use Git hooks**: Enforce linting (pre-commit) and tests (pre-push).

## Tools
- **Git Platform**: GitHub/GitLab/Bitbucket for branch protection and PR management.
- **CI/CD**: GitHub Actions, Jenkins, or GitLab CI for automated testing.
- **Issue Tracker**: Link commits/PRs to JIRA tickets (e.g., `JIRA-123: Fix login bug`).
- **Versioning**: Consider `semantic-release` for automated versioning.

## Contributing
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Create a branch following the naming conventions.
3. Submit a PR with a clear description and linked JIRA ticket.
4. Ensure all CI/CD checks pass and address reviewer feedback.
