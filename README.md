# Dropbox Clone - File Storage Application

## Overview

This project is a **simplified Dropbox-like file storage application** built using:

- **Backend:** Java Spring Boot with RESTful APIs
- **Frontend:** React.js with Material UI
- **Database:** PostgreSQL (Dockerized)
- **Storage:** Files are stored **locally**

## Features

- **List All Files** with details (filename, size, upload time)
- **Download Files** via an API endpoint
- **View File Contents** in the homepage
- **CORS Management** for API access across different domains

---

## Prerequisites

Ensure you have the following installed:

- **Java 17+**
- **Maven**
- **Node.js (16+)**
- **Docker & Docker Compose**
- **Postman (Optional - for API testing)**

---

## Backend Setup (Spring Boot)

1. **Clone the repository:**

2. **Run PostgreSQL in Docker:**
   move to dropbox-backend folder, in the folder run
   ```sh
   docker-compose up -d
   ```

   This command will start a PostgreSQL container with the required database and credentials as mentioned in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/dropbox
   spring.datasource.username=admin
   spring.datasource.password=admin
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   # Local file storage path
   file.storage.location=./uploaded-files
   ```

3. **Run the Spring Boot Application:**

   ```sh
   mvn spring-boot:run
   ```

   The backend will start on **`http://localhost:8080`**.

---

## Frontend Setup (React.js)

1. **Navigate to the frontend folder:**

   ```sh
   cd ../dropbox-frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend:**

   ```sh
   npm start
   ```

   The frontend will run on **`http://localhost:3000`**.

---

## API Endpoints

### 1. **File Management**

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| `POST` | `/files/upload`     | Upload a file                |
| `GET`  | `/files`            | Get a list of uploaded files |
| `GET`  | `/files/{fileName}` | Download a file              |


## CORS Configuration

CORS has been enabled in `WebConfig.java`:

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("*")
            .allowedHeaders("*");
}
```

This ensures the API can be accessed from any frontend.

---

