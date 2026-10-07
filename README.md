# Hostel Admission System

A complete full-stack web application for managing hostel admissions, rooms, and student profiles. The project is split into a robust **Spring Boot** Java backend and a dynamic **React** frontend.

## 📂 Project Structure

This is a Monorepo containing both the frontend and backend applications in separate directories:

- **`frontend/`** - The React.js application (User Interface)
- **`backend/`** - The Spring Boot Java API (Server & Database logic)

## 🚀 Technology Stack

**Frontend:**
- React.js
- Material UI (MUI) & Emotion
- React Router DOM
- Axios (for API communication)

**Backend:**
- Java 17
- Spring Boot 3.1.5
- Spring Data MongoDB
- MongoDB Atlas (Cloud Database)

---

## 🛠️ Local Execution Instructions

To run the full application locally, you will need **two terminal windows** (one for the frontend and one for the backend).

### 1. Configure the Database
For security, the MongoDB credentials are not stored in the code. You must set your `MONGO_URI` environment variable before running the backend.

1. Open your terminal.
2. Set the `MONGO_URI` variable to your MongoDB Atlas connection string:
   ```bash
   # On Windows PowerShell:
   $env:MONGO_URI="mongodb+srv://<username>:<password>@cluster.ask9m7i.mongodb.net/hostel_db"
   
   # On Mac/Linux:
   export MONGO_URI="mongodb+srv://<username>:<password>@cluster.ask9m7i.mongodb.net/hostel_db"
   ```

### 2. Start the Backend Server
The backend handles database connections and serves REST API endpoints on `http://localhost:8080`.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application using the Maven wrapper:
   ```bash
   # On Windows:
   .\mvnw spring-boot:run
   
   # On Mac/Linux:
   ./mvnw spring-boot:run
   ```
   *The backend server will start and connect to the MongoDB database automatically using your MONGO_URI.*

### 2. Start the Frontend App
The frontend is the website users will see and interact with. It runs on `http://localhost:3000`.

1. Open your second terminal window.
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install the required Node dependencies (only needed the first time):
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
   *Your browser will automatically open `http://localhost:3000` and the application will be ready to use!*

---

## Live Demo Link
```bash
https://hostel-admission-system-1.onrender.com
```
