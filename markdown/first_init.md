🛒 E-Commerce Website — Frontend PRD

Project Type: Frontend Technical Test
Tech Stack: React 19, Vite, Tailwind CSS v3, daisyUI v4
Deadline: 5 Days
Deployment: GitHub (required)

1. Product Overview

This project is a modern, responsive e-commerce web application built using React.js.
The goal is to evaluate frontend engineering skills including:

Component architecture

UI/UX quality

Responsiveness

API integration

Code cleanliness and scalability

The application consumes predefined REST APIs and focuses on core e-commerce flows such as browsing products, authentication, and product details.

ReactjsTest (1)

2. Goals & Success Criteria

🎯 Goals

Build a production-quality frontend using React

Implement all required pages and flows

Consume and display data from provided APIs

Ensure clean UI, responsiveness, and animations

Maintain clean folder and component structure

✅ Success Criteria

All required pages implemented

APIs correctly integrated

UI works smoothly on mobile & desktop

Error and loading states handled

Project deployed and accessible via GitHub

ReactjsTest (1)

3. Tech Stack & Constraints
Required Dependencies
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
},
"devDependencies": {
  "@vitejs/plugin-react": "^5.1.1",
  "vite": "^7.2.4",
  "tailwindcss": "^3.4.19",
  "daisyui": "^4.12.24",
  "eslint": "^9.39.1"
}

Styling

Tailwind CSS for utility-first styling

daisyUI for prebuilt UI components

Fully responsive layouts (mobile-first)

4. Core Features & Pages
4.1 Navigation Bar (Global)
Functional Requirements

Login / Register button

Cart icon

Cart item count badge

Responsive behavior for mobile & desktop

UX Notes

Sticky navigation

Clear visual hierarchy

Accessible tap targets on mobile

ReactjsTest (1)

4.2 Home Page
Sections
1️⃣ Banner Section

Full-width banner

Image or carousel

Visually engaging hero area

2️⃣ Banner Images Grid

Grid layout of promotional images

Responsive columns

3️⃣ Products Carousel

Horizontally scrollable product list

Shows featured or promoted products

4️⃣ Products Grid

Grid layout of products

Image, name, price

Clickable product cards

API Integration

GET

https://api.sari3.com/v2/index.php?route=assignment_test/home_widgets


ReactjsTest (1)

4.3 Product Page
Functional Requirements

Display full product information:

Images (gallery)

Title

Description

Price

Reviews (if available)

Clean layout with emphasis on product media

API Integration

GET

https://api.sari3.com/v2/index.php?route=assignment_test/product&product_id={id}

UX Notes

Skeleton loading state

Graceful handling of missing data

ReactjsTest (1)

4.4 Authentication Pages
Pages

Login

Register

Login Form

Email

Password

Register Form

Name

Telephone

Email

Password

UX & Behavior

Responsive layout

Smooth transitions / animations

Input validation

Loading indicators

Error messages from API

API Integration
Login

POST

https://api.sari3.com/v2/index.php?route=assignment_test/login


Payload:

{
  "email": "",
  "password": ""
}

Register

POST

https://api.sari3.com/v2/index.php?route=assignment_test/register


Payload:

{
  "name": "",
  "telephone": "",
  "email": "",
  "password": ""
}


ReactjsTest (1)

5. Application States
Required States

Loading (API calls)

Error (API failure / validation errors)

Empty states (no products, no data)

Success feedback (login/register)

6. Responsiveness & Accessibility
Devices

Mobile

Tablet

Desktop

Requirements

Responsive grid layouts

Accessible buttons & inputs

Proper contrast & readable typography

7. Folder Structure (Suggested)
src/
├── components/
│   ├── navbar/
│   ├── product/
│   └── ui/
├── pages/
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── services/
│   └── api.js
├── hooks/
├── styles/
└── main.jsx

8. Code Quality Expectations

Clean, readable React components

Reusable UI components

Proper separation of concerns

ESLint-compliant code

Meaningful commit history

ReactjsTest (1)

9. Submission Requirements

Push project to GitHub

Include README with setup instructions

Ensure project runs via:

npm install
npm run dev


Send GitHub repository link via email

10. Evaluation Criteria

UI/UX quality

Code organization

API integration accuracy

Responsiveness

Attention to detail

Creativity beyond base requirements

ReactjsTest (1)