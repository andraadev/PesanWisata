<div align="center">

# PesanWisata App (Frontend)

A React-based tourism booking and management web application with role-based navigation, destination catalog, ticket booking flows, and an administrative dashboard for user and destination management.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![React Router](https://img.shields.io/badge/React_Router-6.26.2-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📌 Project Overview

**PesanWisata App (Frontend)** is a single-page React web application designed to facilitate tourism discovery and ticket bookings for travelers, while providing a centralized management panel for administrators.

The application delivers a dual-interface experience:

1. **Public/Traveler Interface**: Explore tourist destinations, review attraction details, calculate ticket costs, and complete bookings.
2. **Admin Panel**: Manage master data including tourist destinations, user accounts, and review customer bookings.

Built on React 18 and React Router DOM v6, the application utilizes declarative client-side routing, responsive Bootstrap layouts, and modular component design.

---

## ✨ Key Features

- **User Authentication Interface**
  - Account registration and login interfaces.
  - Form handling for credential input and user onboardings.

- **Destinations Discovery & Catalog**
  - Browse available tourist destinations with images, descriptions, and ticket pricing.
  - Route-driven destination detail and booking access via destination slug parameters.

- **Ticket Booking Workflow**
  - Destination-specific booking forms (`/booking/:slug`).
  - Input traveler counts, visit dates, contact information, and calculate ticket totals.
  - Booking confirmation and summary view (`/data-booking`).

- **Master Destination Management (Admin)**
  - View comprehensive list of tourist attractions (`/data-destinasi`).
  - Add new tourist destinations with pricing and descriptive details (`/tambah-destinasi`).
  - Update and edit existing destination information (`/edit-destinasi/:id`).

- **User Account Management (Admin)**
  - Manage application users and administrative credentials (`/data-user`).
  - Add new user accounts (`/tambah-user`).
  - Update user profile data and roles (`/edit-user/:id`).

- **Administrative Dashboard**
  - Centralized overview panel (`/beranda`) with quick-action links to master data management modules.

---

## 👥 User Roles

| Role                    | Responsibilities                                                                                                        |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| ** Traveler / Visitor** | Browse tourist destinations, view attraction details, book destination tickets, and view booking summaries.             |
| ** Administrator**      | Access admin dashboard, perform CRUD operations on destinations, manage user accounts, and monitor booking submissions. |

---

## 🎬 Core Workflows

The following describes the primary workflows and user journeys supported across the application:

### 1. Destination Discovery & Booking Flow [soon...]

> Visitors browse available tourism spots from the catalog, select a destination to initiate booking via its unique slug (`/booking/:slug`), submit ticket quantities and personal details, and review their booking details on `/data-booking`.

---

### 2. Destination & User Administration [soon...]

> Administrators navigate through the admin panel (`/beranda`) to manage master destination records and user accounts through dedicated Add (`/tambah-*`) and Edit (`/edit-*`) views.

---

## 🛠️ Tech Stack

- **React.js 18.3.1**
- **React Router DOM 6.26.2**
- **Bootstrap 5**
- **HTML5 & Modern CSS3**
- **React Scripts (CRA Tooling)**

---

## 📦 Packages

| Package                                                  | Purpose                                                | Status  |
| :------------------------------------------------------- | :----------------------------------------------------- | :------ |
| [react](https://react.dev/)                              | Core component-based UI library                        | Used ✅ |
| [react-dom](https://react.dev/)                          | React DOM rendering engine                             | Used ✅ |
| [react-router-dom](https://reactrouter.com/)             | Client-side routing and parameterized page navigation  | Used ✅ |
| [react-scripts](https://create-react-app.dev/)           | Build toolchain, Webpack configuration, and scripts    | Used ✅ |
| [@testing-library/react](https://testing-library.com/)   | React component unit and integration testing utilities | Used ✅ |
| [web-vitals](https://github.com/GoogleChrome/web-vitals) | Core Web Vitals performance telemetry                  | Used ✅ |

---

## ⚡ Quick Install

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x, 18.x, or higher)
- `npm` or `yarn` package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/andraadev/pesanwisata-reactjs.git
   cd pesanwisata-reactjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open the application in your browser at:

   `http://localhost:3000`

---

## 📁 Project Structure

```text
pesanWisataApp-FE/
├── public/                 # Static assets and HTML template
└── src/
    ├── components/         # Reusable UI components
    │   ├── navbar.js       # Main public navigation bar
    │   ├── navbar_admin.js # Admin dashboard navigation bar
    │   └── footer.js       # Global footer component
    ├── pages/              # Application page views
    │   ├── admin/          # Admin management interfaces
    │   │   ├── destinations/ # CRUD destination views (add, update, list)
    │   │   ├── users/        # CRUD user management views (add, update, list)
    │   │   └── index.js      # Admin dashboard home
    │   ├── auth/           # Authentication pages (login, register)
    │   ├── booking.js      # Ticket booking form page
    │   ├── data_booking.js # Booking recap / overview page
    │   ├── destinasi_wisata.js # Public destination catalog
    │   └── index.js        # Public landing page
    ├── App.js              # Route configurations
    └── index.js            # React application entry point
```

---

## 📌 Project Status

> **Maintained, but development is limited**

This project was developed for educational and portfolio purposes as a frontend prototype.

The application provides functional client-side routing, responsive UI layouts, and form workflows. It is **not recommended for production use without connecting a secure backend API, implementing persistent authentication tokens (e.g., JWT), and configuring route guards**.

---

## ⚠️ Disclaimer

This software is provided "as is", without warranty of any kind, express or implied.

The user assumes all responsibility and risk for the use of the software. No official support or maintenance is provided.
