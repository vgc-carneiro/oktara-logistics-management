
# Logistics Management System - By Vinicius Carneiro

## Description

This project is responsible to manage the storage, inventory, and transportation of packages.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) >= 20
- [Docker Compose](https://docs.docker.com/compose/install/) >= 1.29

## Running the app

### IMPORTANT

Before the execution, there are two steps to consider:
1. This project uses a [Google Maps API](https://developers.google.com/maps/documentation), so for the complete use of the functions developed here, you **must** put your [credential key](https://developers.google.com/maps/get-started#api-key) in the file: **./web-logistics/src/shared/components/Map/key.ts**

2. The Warehouse location is: **latitude: 9.947525, longitude: -84.121088,**, therefor is **strongly** recommended to use packages location near the Warehouse location.

### Docker
For executing the project, you just need to run the following command:
```bash
docker-compose up -d --build
```
This **Docker Compose** will create a PostgreSQL database and will seed some information.

## Project Composition

This repository has two projects inside:

## API:

Location: http://localhost:3335/api-docs

The API has its own [README.md](https://github.com/vgc-carneiro/oktara-logistics-management/tree/master/api).

**Tech Stack:**
- [NodeJS v18.12](https://nodejs.org/dist/latest-v18.x/docs/api/)
- [NestJS v9.0.0](https://docs.nestjs.com/)
- [Swagger](https://docs.nestjs.com/openapi/introduction)
- [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
- [Jest v28.1.8](https://jestjs.io/docs/28.x/getting-started)

## Frontend:

Location: http://localhost:3000/

The frontend has its own [README.md](https://github.com/vgc-carneiro/oktara-logistics-management/tree/master/web-logistics).

**Tech Stack:**
- [NodeJS v18.12](https://nodejs.org/dist/latest-v18.x/docs/api/)
- [ReactJS v18.0.25](https://reactjs.org/docs/getting-started.html)
- [Material UI v5.10.13](https://mui.com/pt/material-ui/getting-started/overview/)
- [Axios](https://axios-http.com/docs/intro)