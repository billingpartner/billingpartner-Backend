# Billing Partner Backend

This is the backend service for the Billing Partner application, built with Node.js, Express, and MySQL. It features JWT-based authentication.

## Features

- **User Authentication**: Signup, Login, Forgot Password.
- **JWT Protection**: Secure endpoints using JSON Web Tokens.
- **MySQL Database**: Persistent data storage with a connection pool.
- **Secure Configuration**: Environment-based configuration.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Database

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/billingpartner/billingpartner-Backend.git
    cd billingpartner-Backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory (or ensure the environment variables are set in your deployment platform).
2.  Add the following variables:

    ```env
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_SSL_CA=./config/ca.pem
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

    *Note: The `config/ca.pem` file is required for SSL connections to the database (e.g., Aiven).*

## Running the Application

### Development
Start the server with Node:
```bash
node server.js
```

The server will start on port 3000 (or the PORT defined in `.env`). It will automatically attempt to create the `users` table if it doesn't exist.

## API Endpoints

### Auth

-   **POST /api/users/signup**
    -   Register a new user.
    -   Body: `{ "user": "Name", "companyname": "Co", "address": "...", "gstin": "...", "email": "...", "phone": "...", "password": "..." }`

-   **POST /api/users/login**
    -   Login to receive a JWT token.
    -   Body: `{ "email": "...", "password": "..." }`
    -   Response: `{ "auth": true, "token": "..." }`

-   **POST /api/users/forgot-password**
    -   Reset user password.
    -   Body: `{ "email": "...", "newPassword": "..." }`

### User

-   **GET /api/users/me**
    -   Get details of the logged-in user.
    -   Header: `Authorization: Bearer <token>`

-   **PUT /api/users/me**
    -   Update user details.
    -   Header: `Authorization: Bearer <token>`
    -   Body: `{ "companyname": "...", "address": "...", "gstin": "..." }`

## Deployment

When deploying (e.g., on Render), ensure:
1.  All environment variables from `.env` are set in the platform's environment settings.
2.  The `config/ca.pem` file is present in the repository (it is included in the repo).
