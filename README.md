# Billing Partner Backend

A simple and secure Node.js backend for managing User Profiles, Bills, Products, and Clients.

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
      "addressline2": "Near City Mall",
      "gstin": "29ABCDE1234F1Z5",
      "email": "john@example.com",
      "phone": "9876543210",
      "password": "secretpassword"
    }
    ```
    > `addressline2` and `gstin` are optional fields.

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
      "addressline2": "Near City Mall",
      "gstin": "NEWGSTIN123"
    }
    ```
    > `addressline2` and `gstin` are optional fields.

### 3️⃣ Bills (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create a Bill**
-   **URL:** `/api/bills`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "companyName": "My Company",
      "companyNumber": "9876543210",
      "address": "My Address",
      "addressLine2": "Near City Mall",
      "gstin": "MYGSTIN",
      "customerName": "Client Name",
      "customerNumber": "9988776655",
      "customerGstin": "CUSTGSTIN123",
      "customerAddressLine1": "Client Street 1",
      "customerAddressLine2": "Client Street 2",
      "billDate": "2023-10-27",
      "billItems": [
        { "name": "Service A", "quantity": 1, "price": 1000, "discount": 0, "total": 1000 }
      ],
      "subtotal": 1000,
      "tax": 18,
      "taxAmount": 180,
      "grandTotal": 1180,
      "paymentStatus": "Pending",
      "paymentMode": "UPI",
      "referenceNumber": "REF123456",
      "termsAndConditions": ["Payment due in 30 days"]
    }
    ```
    > Optional fields: `companyNumber`, `addressLine2`, `customerGstin`, `customerAddressLine1`, `customerAddressLine2`, `paymentMode`, `referenceNumber`, `termsAndConditions`.
    > `paymentStatus` defaults to `Pending` if not provided.

**Get All Bills**
-   **URL:** `/api/bills`
-   **Method:** `GET`

**Get a Single Bill**
-   **URL:** `/api/bills/:id`
-   **Method:** `GET`

**Update Bill Payment**
-   **URL:** `/api/bills/:id/payment`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "paymentStatus": "Paid",
      "paymentMode": "Bank Transfer",
      "referenceNumber": "REF789"
    }
    ```
    > All fields are optional. Only provided fields will be updated.

### 4️⃣ Products (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create a Product**
-   **URL:** `/api/products`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "name": "Product Name",
      "category": "Category Name",
      "price": 100.50
    }
    ```

**Get All Products**
-   **URL:** `/api/products`
-   **Method:** `GET`

**Update a Product**
-   **URL:** `/api/products/:id`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "name": "Updated Name",
      "price": 150.00
    }
    ```

**Delete a Product**
-   **URL:** `/api/products/:id`
-   **Method:** `DELETE`

### 5️⃣ Clients (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create a Client**
-   **URL:** `/api/clients`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "customerName": "John Doe",
      "contactNumber": "9876543210",
      "customergstin": "29ABCDE1234F1Z5"
    }
    ```

**Get All Clients**
-   **URL:** `/api/clients`
-   **Method:** `GET`

**Get a Single Client**
-   **URL:** `/api/clients/:id`
-   **Method:** `GET`

**Update a Client**
-   **URL:** `/api/clients/:id`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "customerName": "Jane Doe",
      "contactNumber": "9123456789",
      "customergstin": "29XYZDE1234F1Z5"
    }
    ```

**Delete a Client**
-   **URL:** `/api/clients/:id`
-   **Method:** `DELETE`

---

### 6️⃣ Company Details (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create a Company**
-   **URL:** `/api/companydetails`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "companyname": "My Other Company",
      "address": "456 Park Road",
      "addressline2": "Suite 10",
      "gstin": "22AAAAA0000A1Z5",
      "phone": "9876543210",
      "emailid": "company@example.com"
    }
    ```
    > `addressline2`, `gstin`, and `emailid` are optional fields.

**Get All Companies**
-   **URL:** `/api/companydetails`
-   **Method:** `GET`

**Get a Single Company**
-   **URL:** `/api/companydetails/:id`
-   **Method:** `GET`

**Update a Company**
-   **URL:** `/api/companydetails/:id`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "companyname": "Updated Company Name",
      "address": "New Address",
      "addressline2": "Floor 3",
      "gstin": "NEWGSTIN123",
      "phone": "9123456789",
      "emailid": "updated@example.com"
    }
    ```

**Delete a Company**
-   **URL:** `/api/companydetails/:id`
-   **Method:** `DELETE`

---

### 7️⃣ Terms and Conditions (Requires Login)

*Add Header: `Authorization: Bearer YOUR_TOKEN_HERE`*

**Create Terms and Conditions**
-   **URL:** `/api/termsandconditions`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "termsandconditions": ["Payment due in 30 days", "No refunds after delivery"]
    }
    ```

**Get All Terms and Conditions**
-   **URL:** `/api/termsandconditions`
-   **Method:** `GET`

**Get a Single Terms and Conditions**
-   **URL:** `/api/termsandconditions/:id`
-   **Method:** `GET`

**Update Terms and Conditions**
-   **URL:** `/api/termsandconditions/:id`
-   **Method:** `PUT`
-   **Body:**
    ```json
    {
      "termsandconditions": ["Updated term 1", "Updated term 2"]
    }
    ```

**Delete Terms and Conditions**
-   **URL:** `/api/termsandconditions/:id`
-   **Method:** `DELETE`

---

## 🗄️ Database

The project uses a MySQL database with the following tables:
1.  **Users:** Stores user login and profile info.
2.  **Bills:** Stores billing records linked to users.
3.  **Products:** Stores product details linked to users.
4.  **Clients:** Stores client details (name, contact number) linked to users.
5.  **CompanyDetails:** Stores multiple company profiles linked to users.
6.  **TermsAndConditions:** Stores terms and conditions (JSON) linked to users.

The database tables are automatically created when you start the server.
