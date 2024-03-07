<!-- omit in toc -->
# DGII RNC ― API

[![🧪 Tests]](https://github.com/angelmadames/dgii-rnc-api/actions/workflows/tests.yml)

<!-- omit in toc -->
# Contents

- [Overview](#overview)
- [Commands](#commands)
- [Database](#database)
  - [Migrations](#migrations)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [License](#license)

## Overview

An Open-source Community-driven API for the National Taxpayer Registry (RNC)
of the Dominican Republic.

Created using [Nest](https://github.com/nestjs/nest).

## Commands

The DGII RNC API uses two commands:

- `download-rnc-file`: downloads the [DGII RNC zip file] that will be processed by
  the API.

  To run the `download-rnc-file` command, you can use:

  ```bash
  npm run download-rnc-file
  # which executes the shell command: `ts-node ./src/cli.ts download-rnc-file`
  ```

- `process-rnc-file`: ingests the unzipped RNC file (`txt` format by sending jobs
  to the queue. If the API server is running, it will begin processing the jobs
  right away.

  To run the `process-rnc-file` command, you can use:

  ```bash
  npm run process-rnc-file
  # which executes the shell command: `ts-node ./src/cli.ts process-rnc-file`
  ```

## Database

The supported relational database for this project is PostgreSQL >= 16.x.

### Migrations

To run the database migrations, first build the project, and then run:

```bash
npm run migration:run
```

## Installation

```bash
npm ci
```

## Running the API

```bash
npm run start # development mode
npm run dev # watch mode
npm run production # production mode
```

## License

The DGII RNC API is [MIT licensed](LICENSE).

<!-- References -->
[🧪 Tests]: https://github.com/angelmadames/dgii-rnc-api/actions/workflows/tests.yml/badge.svg?branch=main
[DGII RNC zip file]: https://www.dgii.gov.do/app/WebApps/Consultas/rnc/DGII_RNC.zip
