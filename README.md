# Billing Partner Backend

A simple and secure Node.js backend for managing User Profiles and Bills.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Setup Environment:**
    Create a `.env` file in the main folder with these details:
    ```env
    DB_HOST=...
    DB_USER=...
    DB_PASSWORD=...
    DB_NAME=...
    DB_PORT=...
    DB_SSL_CA=./config/ca.pem
    JWT_SECRET=supersecretkey
    PORT=3000
    ```

3.  **Run the Server:**
    ```bash
    npm start
    ```
    The server runs on `http://localhost:3000`.

---

## 📡 API Endpoints

### 1️⃣ User Authentication

**Sign Up**
-   **URL:** `/api/users/signup`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "user": "John Doe",
      "companyname": "John's Tech",
      "address": "123 Main St",
      "gstin": "29ABCDE1234F1Z5",
      "email": "john@example.com",
      "phone": "9876543210",
      "password": "secretpassword"
    }
    ```

**Login**
-   **URL:** `/api/users/login`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "phone": "9876543210",
      "password": "secretpassword"
    }
    ```
-   **Returns:** A `token`. You must use this token for other requests.

**Forgot Password**
-   **URL:** `/api/users/forgot-password`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "phone": "9876543210",
      "newPassword": "newsecretpassword"
    }
    ```

### 2️⃣ User Profile (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Get My Details**
-   **URL:** `/api/users/me`
-   **Method:** `GET`

**Update My Details**
-   **URL:** `/api/users/me`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "companyname": "New Company Name",
      "address": "New Address",
      "gstin": "NEWGSTIN123"
    }
    ```

### 3️⃣ Bills (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create a Bill**
-   **URL:** `/api/bills`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "companyName": "My Company",
      "address": "My Address",
      "gstin": "MYGSTIN",
      "customerName": "Client Name",
      "customerNumber": "9988776655",
      "billDate": "2023-10-27",
      "billItems": [
        { "name": "Service A", "quantity": 1, "price": 1000, "discount": 0, "total": 1000 }
      ],
      "subtotal": 1000,
      "tax": 18,
      "taxAmount": 180,
      "grandTotal": 1180
    }
    ```

**Get All Bills**
-   **URL:** `/api/bills`
-   **Method:** `GET`

---

## 🗄️ Database

The project uses a MySQL database with two main tables:
1.  **Users:** Stores user login and profile info.
2.  **Bills:** Stores billing records linked to users.

The database tables are automatically created when you start the server.
