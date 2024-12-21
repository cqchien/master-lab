# **Chat Application**

This project is a **NestJS**-based chat application utilizing **TypeScript** and **PostgreSQL**. Follow the steps below to set up, run, and manage the application.

---

## **Prerequisites**

Ensure you have the following installed on your machine:

- **Node.js** (v16 or above)
- **npm** or **yarn**
- **Docker** (latest version)
- **Make** (to execute `Makefile` commands)

---

## **Getting Started**

### **1. Initialize Environment Variables**

#### 1. Bootstrap the Application

To set up the application, including installing dependencies and preparing the environment, run:

```bash
make bootstrap
```

This command will install all required packages and perform initial setup tasks.

#### 2. Open the .env file and input the necessary values for each variable.

### **2. Start services**

#### 1. Run the container services

Start the PostgreSQL database using Docker:

```bash
make up
```

This command utilizes the Makefile to launch the database service in a Docker container.

### **3. Migration**

#### 1. Manage Database Migrations

Create a New Migration
To generate a new migration file, execute:

```bash
make create-migrate migrationName
```

Replace MigrationName with a descriptive name for your migration.

#### 2. Apply Migrations

To apply all pending migrations to the database:

```bash
make up-migrate
```

#### 3. Revert Migrations

To revert the last applied migration:

```bash
make down-migrate
```

### **4. Start the Application**

You can run the application in development mode using one of the following methods:

Run Locally with make

```bash
make dev-up
```

#### Access the Application

Once the application is running, access it at:
API Endpoint: `http://localhost:3000`

### **4. Troubleshooting**

Ensure Docker is running if database services fail to start.
Verify the .env file for any missing or incorrect variables.
View logs using:

```bash
docker logs <container-name>
```
