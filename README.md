# E-Commerce Project

An e-commerce project with product and variant management using Node.js, Prisma, and PostgreSQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
  - [Run the Application](#run-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Architectural Decisions](#architectural-decisions)
- [Assumptions](#assumptions)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is an e-commerce application that allows users to manage products and their variants. It is built using Node.js, Prisma, and PostgreSQL.

## Features

- Create, update, and delete products
- Manage product variants
- Search products by name, description, or variant name

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download](https://nodejs.org/)
- PostgreSQL: [Download](https://www.postgresql.org/)
- Prisma: Install Prisma CLI globally using `npm install -g prisma`

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IramAbid/E-commerce.git
2. Change into the project directory:

  `` cd E-commerce
  ``

### Install dependencies:

  `` npm install 
  ``

### Database Setup

1. Create a PostgreSQL database for your project.

2. Update the Prisma configuration file (prisma/schema.prisma) with your database connection details:

```
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Update with your database connection URL
}

model Product {
  // Define your product model
  // ...
}

model Variant {
  // Define your variant model
  // ...
}
```

Run the Prisma migration to apply the database schema:

``npx prisma migrate dev --name nameofmigration
``

### Environment Variables

Create a .env file in the project root and configure the following environment variables:


`` DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
PORT=4000 
``

Replace username, password, and yourdatabase with your PostgreSQL credentials.

### Run the Application

Start the development server:


``npm start
``

or using nodemon:

``nodemon index.js
``

The application will be accessible at http://localhost:4000 by default.

### Usage
1. Visit http://localhost:4000 in your browser to access the application.
2. Use the provided API routes to interact with products and variants.

### Contributing

Contributions are welcome! Feel free to open issues or pull requests.

### License

This project is licensed under the MIT License.
