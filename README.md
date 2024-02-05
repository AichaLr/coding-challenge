# Coding challenge

This repository contains the source code for the coding challenge.

Creation of a robust Node.js **REST-API** for product management, providing full CRUD (Create, Read, Update, Delete) functionality for products

## Getting Started

### 1. Clone the Repository

```bash

git clone https://github.com/AichaLr/coding-challenge.git

cd coding-challenge
```

### 2. Running the app

- Create a .env file in the root of the project based on the provided .env.example. Update the variables with your configuration.

#### Without docker compose

- Install dependencies

```bash
npm install
```

- run the app

```bash
npm run start:dev
```

#### With docker compose

- start the container

```bash
docker-compose -up
```

- you can aceess the mongo compass at the url [http://localhost:8081/](http://localhost:8081/)
  and connect by the :
- username: root and password: password

- you can access SWAGGER in the following link
