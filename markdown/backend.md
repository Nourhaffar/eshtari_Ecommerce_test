# Node.js Proxy / BFF Backend (Express)

## Overview

This project is a **small Node.js + Express backend** that acts as a **Proxy / Backend-for-Frontend (BFF)** between a **React frontend** and a **Laravel API**.

The backend sits between the frontend and the original Laravel services in order to:

- Normalize API responses
- Enrich missing data needed by the UI
- Serve local static assets (images)
- Provide a clean, frontend-friendly API layer

---

## 🎯 Goal

The proxy must:

- Fetch the original JSON response from the Laravel API endpoints
- Enrich / normalize the response to add missing data required by the UI
- Return the enriched JSON to the frontend
- Serve local images as static files so the enriched JSON can reference them

---

## 🧱 Architecture

```text
React Frontend
      │
      ▼
Node.js Proxy / BFF (Express)
      │
      ▼
Laravel API
🔧 Tech Requirements
Runtime
Node.js (ESM modules)

Core Libraries
Express — HTTP server & routing

axios — HTTP client for calling Laravel APIs

cors — Cross-Origin Resource Sharing

dotenv — Environment variable management

morgan — HTTP request logging

Development Tools
nodemon — Auto-restart server in development

📦 Dependencies
json
Copy code
{
  "dependencies": {
    "express": "^4.x",
    "axios": "^1.x",
    "cors": "^2.x",
    "dotenv": "^16.x",
    "morgan": "^1.x"
  },
  "devDependencies": {
    "nodemon": "^3.x"
  }
}
🗂️ Responsibilities of the BFF
1. API Proxying
Forward requests from the frontend to Laravel APIs

Handle authentication headers if needed

Centralize error handling

2. Data Enrichment
Examples:

Add local image URLs

Normalize naming conventions

Inject UI-friendly fields

Flatten deeply nested responses

3. Static Assets
Serve local images using Express static middleware

Allow API responses to reference:

txt
Copy code
http://localhost:PORT/images/example.jpg
📁 Suggested Folder Structure
text
Copy code
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   └── app.js
├── public/
│   └── images/
├── .env
├── package.json
└── README.md
🚀 Expected Outcome
Frontend consumes only the Node.js BFF

Laravel API remains unchanged

UI gets clean, normalized, enriched data

Static assets are served locally by the proxy

📌 Notes
This backend is not a full business backend

It exists purely to support frontend needs

All logic should be UI-driven and presentation-focused