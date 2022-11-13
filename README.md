
# API - Logistics Management System - By Vinicius Carneiro

## Description

An API responsible to manage storage, inventory and transportation of packages.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) >= 20
- [Docker Compose](https://docs.docker.com/compose/install/) >= 1.29

## Running the app

### Docker
For executing the project, you just need to run the following command:
```bash
docker-compose up -d
```
This **Docker Compose** will create a PostgreSQL database and will seed some information.

**IMPORTANT**: The seeds will populate information about: *Warehouses* and *Locations*. If you stop the containers and run them again, they will seed the database again.

## Running the automated tests

This App is using [Make](https://www.gnu.org/software/make/manual/make.html#Overview) for make easier your execution.

### Unit tests:
```bash
# With Make
$ make setup
$ make install
$ make tests

# Without Make
$ docker volume create api-log-manager-nodemodules
$ docker-compose -f docker-compose.builder.yml run --rm install
$ docker-compose -f docker-compose.test.yml up
```


### Check the coverage:
```bash
# With Make
$ make setup
$ make install
$ make cover

# Without Make
$ docker volume create api-log-manager-nodemodules
$ docker-compose -f docker-compose.builder.yml run --rm install
$ docker-compose -f docker-compose.test.cov.yml up
```

## Development

```bash
# With Make
$ make setup
$ make install
$ make dev

# Without Make
$ docker volume create api-log-manager-nodemodules
$ docker-compose -f docker-compose.builder.yml run --rm install
$ docker-compose -f docker-compose.dev.yml up
```




## Swagger
This projects uses a Swagger as API Documentation. The path is: **/api-docs**

## HealthCheck

This project uses a Terminus as a Healthcheck. In case you needed the path is: **/healthcheck**

## ERD

This is the ERD (Entity Relationship Diagram) for the project:

![ERD - LOG-MANAGER](./assets/ERD.png)