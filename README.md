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

---

## ☁️ Deploying to Render — fixing "Error connecting to backend"

The project is deployed as **two separate Render services**:

| Service | URL | Type |
| --- | --- | --- |
| Frontend (React) | `https://hostel-admission-system-1.onrender.com` | Static Site |
| Backend (Spring Boot) | `https://hostel-admission-system.onrender.com` | Web Service |

If the UI shows **"Error connecting to backend"**, work through the checks below in order.

### Step 1 — Is the backend itself alive?

Open in a browser / Postman:

```
https://hostel-admission-system.onrender.com/api/health
```

* **`{"status":"UP", ...}`** → the backend is running. The problem is the **MongoDB connection** → go to Step 2.
* **Timeout / no response** → the service is asleep or failed to deploy → go to Step 4.

You can also compare with an endpoint that touches the database:

```
https://hostel-admission-system.onrender.com/api/Student
```

If `/api/health` answers instantly but `/api/Student` hangs for ~30 seconds and then fails,
the backend cannot reach MongoDB Atlas (30 s is the Mongo driver's server-selection timeout).

> **`/api/health` returns 404?** The running backend predates the `/api/health` endpoint, so the
> latest code has not been deployed yet. Push your changes and let Render redeploy, then retry.

There is also a dedicated database probe that answers in plain English:

```
https://hostel-admission-system.onrender.com/api/health/db
```

| Result | Meaning |
| --- | --- |
| `200 {"status":"UP","database":"hostel_db","ping":1}` | The backend **can** reach MongoDB Atlas. |
| `503 {"status":"DOWN","error":"MongoTimeoutException", ...}` | The backend **cannot** reach Atlas — see Step 2. The `message` field carries the raw driver error and the `hint` field the fix. |

Any request that fails because Mongo is unreachable now returns a readable JSON body instead of
the opaque Spring `Whitelabel Error Page`:

```json
{
  "status": 503,
  "error": "MONGO_UNAVAILABLE",
  "message": "Cannot reach MongoDB Atlas, so the request could not be served.",
  "hint": "Check MongoDB Atlas -> Security -> Network Access and allow access from anywhere (0.0.0.0/0) so the Render service's dynamic IPs are not blocked."
}
```

That mapping lives in `GlobalExceptionHandler.java` (`@RestControllerAdvice`); the probe lives in
`HealthController.java`.

### Step 2 — Allow Render to reach MongoDB Atlas ⚠️ most common cause

Render's outbound IP addresses are **dynamic**, so a specific IP cannot be whitelisted.

1. Log in to <https://cloud.mongodb.com>
2. Open your project → **Security → Network Access** (the page is titled *IP Access List*)
3. Click **Add IP Address**
4. In the **Access List Entry** box, type the value by hand:
   ```
   0.0.0.0/0
   ```
   Give it a **Comment** such as `Render backend (dynamic IPs)` and click **Confirm**.

**The "Allow Access from Anywhere" button is only a shortcut** that pre-fills `0.0.0.0/0`. Recent
Atlas versions no longer show it in the dialog — typing the value is exactly equivalent. The
`/0` suffix is CIDR notation meaning "every address".

> The **Add IP Address** button requires the **Project Owner** or **Project Network Access
> Manager** role. If it is missing or greyed out, you do not have permission on this project, and
> the project owner must make the change.

Also confirm the cluster is not **paused** (Atlas pauses idle free clusters).

Changes to the IP access list take effect within about a minute. Because the backend connects on
each request, the **already-running** Render service recovers as soon as the entry is saved — you
do **not** need to redeploy to test it. Reopen
`https://hostel-admission-system.onrender.com/api/Student`: `[]` means Atlas is reachable again,
while a 500 means the entry has not taken effect.

### Step 3 — Set the `MONGO_URI` environment variable

The credentials are no longer hard-coded in `MongoConfig.java`; the backend now reads them
from `spring.data.mongodb.uri`, which is bound to `MONGO_URI`.

1. Render Dashboard → your **backend** Web Service → **Environment**
2. Add the variable:

   | Key | Value |
   | --- | --- |
   | `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster.ask9m7i.mongodb.net/hostel_db?retryWrites=true&w=majority` |

3. Save — Render redeploys automatically.
4. Make sure the database user exists under **Security → Database Access** and that the
   password has no unescaped special characters (`@`, `:`, `/`, `#` must be percent-encoded).

### Step 4 — Health check / port binding

* `application.properties` uses `server.port=${PORT:8080}`, so the app listens on the port
  Render assigns (8080 locally).
* Under **Settings → Health Check Path** you can use `/api/health`.
* On the **free plan** a Web Service spins down after ~15 minutes of inactivity; the next
  request can take 30–60 s to wake it up. The frontend now shows a friendlier message about
  this instead of a bare "Error connecting to backend."

### Step 5 — Point the frontend at the right backend

`frontend/src/services/studentService.js` defaults to the deployed backend URL and can be
overridden at build time:

```bash
# frontend/.env  (local development)
REACT_APP_API_BASE_URL=http://localhost:8080
```

On Render, add `REACT_APP_API_BASE_URL` to the **static site's** environment variables
*before* building, because Create React App inlines `REACT_APP_*` values at build time.

