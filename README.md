# Next.js Library App (Dockerized)

This is a Next.js-based library application that uses PostgreSQL and MongoDB as databases. This guide will help you set up and run the application using Docker.

## Demo

Check out a demo of the app in action:  
[![Watch the demo](https://img.youtube.com/vi/tqrFGQp8HbI/0.jpg)](https://www.youtube.com/watch?v=tqrFGQp8HbI)  
[Watch on YouTube](https://www.youtube.com/watch?v=tqrFGQp8HbI)


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


## Tech Stack

### Frontend
- **Next.js** (15.2.0) - React framework for server-side rendering and static site generation.
- **React** (19.0.0) - JavaScript library for building user interfaces.
- **React DOM** (19.0.0) - Entry point for React applications working with the DOM.
- **Material UI** (6.4.6) - UI component library for a modern and responsive design.
- **Emotion** (11.14.0) - CSS-in-JS library for styling components.
- **Roboto Font** - Custom font styling with `@fontsource/roboto`.

### Backend
- **Apollo Server** (4.11.3) - GraphQL server for handling API requests.
- **Apollo Client** (3.13.1) - State management and GraphQL querying tool.
- **GraphQL Integration for Next.js** - `@as-integrations/next` (3.2.0) for seamless GraphQL API integration.
- **Sequelize** (7.0.0-alpha.45) - ORM for PostgreSQL database interactions.
- **Mongoose** (8.12.1) - ODM for MongoDB database interactions.

### Database
- **PostgreSQL** - Used for structured data management (integrated via Sequelize).
- **MongoDB** - Used for unstructured data like reviews and ratings (integrated via Mongoose).

### DevOps & Tooling
- **ESLint** (9) - Linting and code quality checks.
- **dotenv** (16.4.7) - Environment variable management.
- **Docker** - Running MongoDB and PostgreSQL containers.
- **Node.js** (23.7.0) - JavaScript runtime environment.

### Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the Next.js app.
- `npm run start` - Start the production server.
- `npm run lint` - Run ESLint for code quality checks.



