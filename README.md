# Property Ecommerce Platform (Demo JK)

## 📌 Project Overview
The **Demo JK Property Platform** is a modern, full-stack real estate application designed to revolutionize how users discover, buy, and rent properties. Built with the MERN stack and enhanced with AI capabilities, it offers valid search tools, financial calculators, and a seamless comparison engine, all wrapped in a stunning glassmorphism UI.

## 🛠️ Technology Stack

### Frontend
- **Framework:** [React](https://react.dev/) (v18+) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Custom Glassmorphism Theme
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
- **State Management:** React Context API (Auth, Language, Comparison)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/)
- **Notifications:** React Hot Toast
- **SEO:** React Helmet Async

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Atlas or Local) via Mongoose
- **AI Integration:** Custom NLP-based Search Logic (Regex-based Mock AI)
- **Security:** Helmet, CORS, Rate Limiting
- **File Storage:** Local storage (Uploads)

## ✨ Key Features

### 1. 🤖 AI-Powered Search
- **Natural Language Querying:** Users can search using phrases like *"3 bedroom condo in Mont Kiara under 2 million"* or *"Find me a rental near KLCC"*.
- **Smart Parsing:** The system extracts location, price, property type, and bedroom requirements automatically.

### 2. ⚖️ Property Comparison Engine
- **Side-by-Side View:** Compare up to 4 properties simultaneously.
- **Detailed Specs:** Compare price, built-up area, land area, tenure, and price per sqft.
- **Interactive:** Easily add/remove properties from the comparison bar while browsing.

### 3. 🧮 Financial Tools
- **Mortgage Calculator:** Estimate monthly repayments based on loan amount, interest rate, and tenure.
- **Affordability Calculator:** Determine maximum property budget based on income and commitments.

### 4. 🏢 Comprehensive Property Management
- **Listings:** Dedicated Buy, Rent, and New Launch sections.
- **Advanced Filtering:** Filter by precise location, price range, property type, and size.
- **Media Support:** Galleries supporting both high-res images and video tours.

### 5. 🛠️ Admin Dashboard
- **Content Management:** Full CRUD for Properties, Jobs, and Agents.
- **Lead Tracking:** View and manage inquiries from the "Contact Us" form.
- **Analytics:** Visual charts for property distribution and price trends.
- **System Logs:** Track admin activities for security and auditing.

## 📂 Project Structure

### `frontend/src/`
- **`components/`**: Reusable UI (Navbar, Hero, Footer, PropertyCard, ComparisonBar).
- **`pages/`**:
  - **Public:** `Home`, `Buy`, `Rent`, `NewLaunch`, `PropertyDetails`, `Compare`, `Calculators`.
  - **Admin:** `Dashboard`, `Properties`, `Jobs`, `Agents`, `Leads`.
- **`context/`**: `AuthContext`, `ComparisonContext`, `LanguageContext`.

### `backend/`
- **`controllers/`**: Logic for Properties, Jobs, Leads, AI Search.
- **`models/`**: Mongoose Schemas (`Property`, `Job`, `Lead`, `Log`).
- **`routes/`**: API Route definitions.
- **`middleware/`**: Authentication and Security.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Instance

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-repo/property-ecomm.git
    cd property-ecomm
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create .env file
    # PORT=5000
    # MONGO_URI=mongodb://localhost:27017/property_db
    # JWT_SECRET=your_secret_key
    
    # Seed Database (Optional)
    node seed.js
    
    # Run Server
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    # Create .env file
    # VITE_API_URL=http://localhost:5000
    
    # Run Client
    npm run dev
    ```

## 🔒 Security Measures
- **Rate Limiting:** Protects API from abuse.
- **Helix:** Sets secure HTTP headers.
- **Input Sanitization:** Prevents NoSQL injection (Custom logic replacing xss-clean).

## 📄 License
This project is licensed under the MIT License.
