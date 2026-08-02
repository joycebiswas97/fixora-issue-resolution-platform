# 🌾 GramSeva: Rural Grievance Redressal System

GramSeva is a MERN-stack web application designed to bridge the digital divide in rural communities. It enables village residents (citizens) to report local civic issues—such as water supply disruption, road damage, electricity failures, or sanitation concerns—directly to their local Gram Panchayat authorities. 

By automating, geotagging, and monitoring complaints, GramSeva provides transparency, speed, and accountability to local governance.

---

## ✨ Key Features & Innovation

### 👤 Citizen Portal
- **Direct Reporting:** Submitting complaints with a title, description, category, and physical address alongside custom geographic coordinates.
- **Evidence Upload:** Seamless image uploading using **Multer** and **Cloudinary** integration.
- **Double Feeds Layout:** 
  - *Community Feed (Overview):* A public timeline of all local issues raised in the Panchayat to prevent duplicate complaints and encourage transparency.
  - *My Complaints:* A private, detailed dashboard to track individual complaints filed by the citizen.
- **Status Tracker:** Real-time feedback badge showing `Pending` ➡️ `In Progress` ➡️ `Resolved`.

### 🏢 Official Dashboard (Panchayat Panel)
- **Interactive Issue Map:** Integrates **LeafletJS** & **OpenStreetMap** to plot all `Pending` and `In Progress` complaints as markers.
- **Visual Analytics:** Interactive charts (using **Recharts**) visualizing issue counts across categories and resolution efficiency.
- **Evidence Review:** Clickable lightbox viewer to view full-resolution uploaded images of complaints.
- **Secure Registration:** Official registration requires a secret administrative key (`GramSeva_Admin_2026!`) to prevent unauthorized access.

### 🌐 Global Multilingual Interface
- Seamless multi-language toggling (English, Hindi, and Bengali) using **react-i18next** to ensure accessibility for non-English speaking citizens. Preferences are saved locally to persist across sessions.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React-Leaflet, Recharts, Lucide React, react-i18next
- **Backend:** Node.js, Express.js, JSON Web Tokens (JWT)
- **Database:** MongoDB & Mongoose (with GeoJSON Point spatial indexing)
- **File Storage:** Cloudinary

---

## 🚀 Quick Setup & Installation

### 1. Configure the Backend
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   OFFICIAL_SECRET_KEY=GramSeva_Admin_2026!
   ```
4. Start the backend developer server:
   ```bash
   npm run dev
   ```

### 2. Configure the Frontend
1. Go to the frontend folder:
   ```bash
   cd gram-seva/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React app:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 📞 Panchayat Helpline & Support

For immediate assistance, villagers can reach out to the **Centralized Panchayat Helpline**:
- 📞 **Helpline Number:** `1800-111-2222` (Toll-Free, 24/7 Support)
