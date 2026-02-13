# Property Ecommerce Platform (Demo JK)

## 📌 Project Overview
This project is a modern, full-stack real estate property e-commerce platform designed to facilitate buying, renting, and discovering new property launches. It features a responsive glassmorphism UI, a comprehensive admin dashboard, and robust search capabilities.

## 🛠️ Technology Stack

### Frontend
- **Framework:** [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/)
- **Forms/Notifications:** React Hot Toast
- **SEO:** React Helmet Async
- **Authentication:** Firebase Client SDK (Planned integration)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **File Storage:** Local storage using [Multer](https://github.com/expressjs/multer)
- **Authentication:** Custom Middleware (`auth.js`) & Firebase Admin SDK

## 📂 Project Structure

### `frontend/`
The client-side application built with React.
- **`src/pages/`**: Main route components (Home, Buy, Rent, NewLaunch, PropertyDetails, Admin Dashboard).
- **`src/components/`**: Reusable UI components (Navbar, Hero, PropertyCard, FilterBar, SEO).
- **`src/context/`**: Global state management (AuthContext, LanguageContext).
- **`src/styles.css`**: Global styles and Tailwind directives.

### `backend/`
The server-side API application.
- **`models/`**: Mongoose schemas (Property, Job, Agent, Lead, Log, Application).
- **`middleware/`**: Custom middleware (Auth verification).
- **`server.js`**: Main entry point, route definitions, and configuration.
- **`uploads/`**: Directory for storing uploaded property images.
- **`seed.js`**: Script to seed the database with initial property data.

## ✨ Key Features

### 1. User Interface (Client)
- **Dynamic Search:** Real-time property suggestions with images and location grouping.
- **Advanced Filtering:** Filter by price, type, bedrooms, size, and location.
- **Responsive Design:** Mobile-friendly layout with a modern glassmorphism aesthetic.
- **SEO Optimized:** Dynamic meta tags for every page.

### 2. Admin Dashboard
- **Property Management:** CRUD operations for properties.
- **Job Management:** Post and manage career opportunities.
- **Agent Management:** Manage real estate agent profiles.
- **System Logs:** View system activities and user actions.
- **Secure Login:** Admin-specific authentication flow.

### 3. API Endpoints

#### Properties
- `GET /api/properties` - Fetch all properties with filters.
- `GET /api/properties/:id` - Fetch single property details.
- `POST /api/properties` - Create new property (Admin).
- `PUT /api/properties/:id` - Update property (Admin).
- `DELETE /api/properties/:id` - Delete property (Admin).

#### Jobs & Agents
- `GET /api/jobs` - Fetch active jobs.
- `GET /api/agents` - Fetch all agents.
- `POST /api/jobs` - Create job (Admin).
- `PUT /api/jobs/:id` - Update job (Admin).
- `DELETE /api/jobs/:id` - Delete job (Admin).

#### General
- `POST /api/upload` - Upload images.
- `POST /api/leases` - Submit new lead/inquiry.
- `GET /api/logs` - Fetch system activity logs (Admin).

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB connection string

### Installation

1.  **Clone the repository**
2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create .env file with PORT and MONGO_URI
    node server.js
    ```
3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    # Create .env file with VITE_API_URL
    npm run dev
    ```

## 📝 Configuration
Ensure you have the following environment variables set:

**Backend (`.env`)**
```
PORT=5000
MONGO_URI=mongodb+srv://...
```

**Frontend (`.env`)**
```
VITE_API_URL=http://localhost:5000
```
