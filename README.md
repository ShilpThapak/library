# Next.js Library App (Dockerized)

This is a Next.js-based library application that uses PostgreSQL and MongoDB as databases. This guide will help you set up and run the application using Docker.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Create the Environment File
Copy .env.example to .env and adjust any values if necessary.

```sh
cp .env.example .env
```


### 3. Start the Application
Use Docker Compose to build and run the application.

```sh
docker-compose up --build
```

### 4. Access the Application
Next.js App: http://localhost:3000
PostgreSQL: Connect at localhost:5431 (default username: postgres, password: mysecretpassword)
MongoDB: Connect at mongodb://localhost:27017
