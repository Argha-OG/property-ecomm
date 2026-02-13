# Deployment Configuration Guide

To ensure your application works correctly after deployment, you must configure the **Environment Variables** in your deployment platform (e.g., Vercel, Netlify, Render).

## 1. Backend Deployment (e.g., Vercel/Render)

**Required Environment Variables:**

| Variable | Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb+srv://arghacypher_db_user:Dh2P0NFtC6LuDyWG@cluster0.kxa3aun.mongodb.net/?appName=Cluster0` | Connection string to your MongoDB Atlas database. |
| `PORT` | `5000` | (Optional) Port for the server, usually handled by the host. |

> **Important:** Ensure your Backend code includes the CORS fix we implemented (allowing frontend origin).

## 2. Frontend Deployment (e.g., Vercel/Netlify)

**Required Environment Variables:**

| Variable | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://property-ecomm.vercel.app` | The URL of your deployed Backend. **Do NOT use localhost.** |
| `VITE_FIREBASE_CONFIG` | *(Your Firebase Config JSON)* | Copied from your local `.env`. |

### 🔍 Checklist for Success:

- [ ] **Backend:** `MONGO_URI` is set in the deployment dashboard.
- [ ] **Backend:** `npm run build` (if applicable) succeeds.
- [ ] **Frontend:** `VITE_API_URL` is set to the *production* backend URL in the deployment dashboard.
- [ ] **Frontend:** Re-deploy after settings these variables.

---

### ❓ Why separate local and production?

- **Local:** Uses `http://localhost:5000` to connect to your running local server for fast development.
- **Production:** Must use the `https://...` URL so users internet-wide can access your API.
