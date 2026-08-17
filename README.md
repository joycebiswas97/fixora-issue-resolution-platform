# 🛠️ Fixora: Location-Based Issue Reporting & Resolution Platform

Fixora is a MERN-stack web application designed to simplify the reporting, tracking, and resolution of civic, infrastructure, and facility-related issues.

It enables users to report problems such as road damage, water supply disruptions, electricity failures, sanitation concerns, maintenance issues, and other local problems by providing descriptions, physical addresses, geographic coordinates, and photographic evidence.

Organizations and administrative authorities can monitor reported issues through a centralized dashboard, visualize their geographic distribution, review evidence, track resolution progress, and analyze issue trends.

The platform can be adapted for **municipalities, educational institutions, residential communities, corporate facilities, and other organizations** that need a structured system for issue reporting and resolution.

---

## ✨ Key Features

### 👤 User Portal

* **Issue Reporting:** Submit issues with a title, description, category, physical address, and geographic coordinates.
* **Evidence Upload:** Upload photographic evidence using **Multer** and **Cloudinary** integration.
* **Community Feed:** Public timeline of reported issues to improve transparency and help users identify existing reports.
* **My Reports:** Private dashboard for users to view and track the issues they have submitted.
* **Status Tracking:** Monitor issue progress through:
  `Pending` ➡️ `In Progress` ➡️ `Resolved`

### 🏢 Authority Dashboard

* **Interactive Issue Map:** Uses **LeafletJS** and **OpenStreetMap** to visualize reported issues geographically.
* **Visual Analytics:** Interactive charts using **Recharts** to analyze issue categories and resolution status.
* **Evidence Review:** View uploaded photographic evidence through an interactive lightbox.
* **Issue Management:** Review reported issues and update their resolution status.
* **Role-Based Access:** Separate user and authority workflows with authenticated access.

### 🌐 Multilingual Interface

* Supports **English, Hindi, and Bengali** using **react-i18next**.
* Language preferences are stored locally to persist across sessions.
* Designed to improve accessibility for users from different linguistic backgrounds.

---

## 🧩 Potential Applications

Fixora's underlying issue-reporting workflow can be adapted for various environments, including:

* 🏙️ Municipal and civic issue reporting
* 🎓 Educational institutions and campuses
* 🏘️ Residential communities and housing societies
* 🏢 Corporate and office facilities
* 🏭 Industrial and facility maintenance
* 🏥 Hospitals and large organizations
* 🏛️ Government and administrative organizations

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React-Leaflet
* Recharts
* Lucide React
* react-i18next

### Backend

* Node.js
* Express.js
* JSON Web Tokens (JWT)

### Database

* MongoDB
* Mongoose
* GeoJSON Point spatial indexing

### File Storage

* Cloudinary
* Multer

---

## 🏗️ Application Architecture

```text
┌───────────────────────┐
│       React UI        │
│  User & Authority UI  │
└───────────┬───────────┘
            │
            │ HTTP / REST API
            ▼
┌───────────────────────┐
│    Express / Node.js  │
│     Backend Server    │
└───────────┬───────────┘
            │
     ┌──────┴───────┐
     ▼              ▼
┌──────────┐   ┌────────────┐
│ MongoDB  │   │ Cloudinary │
│ Database │   │   Images   │
└──────────┘   └────────────┘
```

---
## 🔐 Demo Credentials

You can use the following demo account to explore the **Authority Dashboard** without creating an authority account.

**Authority / Admin Demo**

* **Email:** `rakesh@mail.com`
* **Password:** `password`

The demo account provides access to features such as:

* 📊 Dashboard & analytics
* 🗺️ Interactive issue map
* 👥 Registered users
* 📋 Complaint management
* 🖼️ Evidence/image review
* 🔄 Issue status tracking

> **Note:** This is a public demo account intended for evaluation and testing. Please do not use it for sensitive information.
---

## 🚀 Quick Setup & Installation

### 1. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OFFICIAL_SECRET_KEY=your_authority_registration_key
```

Start the backend development server:

```bash
npm run dev
```

### 2. Configure the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The application requires environment variables for:

* MongoDB connection
* JWT authentication
* Cloudinary image storage
* Authority registration

**Never commit actual credentials or secrets to the repository.**

Create your own `.env` file using the variables shown above.

---

## 📌 Project Overview

**Fixora** demonstrates how a location-aware reporting and resolution workflow can connect users with the organizations responsible for maintaining their surrounding infrastructure and facilities.

The project combines:

**Reporting → Geolocation → Evidence → Centralized Management → Status Tracking → Resolution Analytics**

into a single full-stack application.

---

## 👥 Project

Developed as a collaborative full-stack project using the MERN stack.

Individual contributions include frontend development, backend API implementation, database integration, file-upload functionality, geolocation features, and dashboard components.
