<!-- omit in toc -->
# How to contribute to DGII RNC API

<!-- omit in toc -->
## Content

- [Bugs \& Features](#bugs--features)
  - [Did you find a bug?](#did-you-find-a-bug)
  - [Did you fix a bug?](#did-you-fix-a-bug)
  - [Did you fix whitespace, format code, or make a purely cosmetic change?](#did-you-fix-whitespace-format-code-or-make-a-purely-cosmetic-change)
  - [Do you want to add a new feature, or change existing functionality?](#do-you-want-to-add-a-new-feature-or-change-existing-functionality)
- [Conventions](#conventions)
  - [Branching model](#branching-model)
  - [Commits](#commits)

## Bugs & Features

### Did you find a bug?

- Do not open up a GitHub issue if the bug is a security vulnerability.
- Ensure the bug was not already reported by searching on GitHub under
  [Issues](https://github.com/angelmadames/dgii-rnc-api/issues).
- If you're unable to find an open issue addressing the problem,
  [open a new one](https://github.com/angelmadames/dgii-rnc-api/issues/new).
  Be sure to include a **title and clear description**, as much relevant
  information as possible, and a **code sample** or an **executable test case**
  demonstrating the expected behavior that is not occurring.

### Did you fix a bug?

- Open a new GitHub pull request with the change.
- Ensure the PR description clearly describes the problem and solution.
  Include the relevant issue number if applicable.
- Make sure all CI tests passed.

### Did you fix whitespace, format code, or make a purely cosmetic change?

Changes that are cosmetic in nature and do not add anything substantial to the stability,
functionality, or testability of the DGII RNC API will generally lower in priority.

### Do you want to add a new feature, or change existing functionality?

- Please open an issue or send me an email. I don't want possible contributors
  to waste time adding changes that will have a hard time getting merged.

## Conventions

### Branching model

Please follow the [TBD] branching model.

### Commits

Please follow the [Conventional Commits] specification.
This is important because we use automatic releases and the
changelog along with the version bumps depend on expected
annotations to commits.

<!-- References -->
[TBD]: https://trunkbaseddevelopment.com
[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0
