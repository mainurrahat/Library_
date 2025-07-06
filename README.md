# 📚 Minimal Library Management System

A modern, lightweight, and public **Library Management Web App** — built with ❤️ using React, TypeScript, Redux Toolkit Query, and Tailwind CSS.

<div align="center">

🌐 [Live Site](https://library-snowy-three.vercel.app/) | 🧠 [Frontend Repo](https://github.com/mainurrahat/Library_) | 🚀 [Backend Repo](https://github.com/mainurrahat/Library_server)

</div>

---

## 🎯 What is This?

The **Minimal Library Management System** allows anyone (no login required!) to add, view, update, delete, and borrow books — perfect for demos, educational purposes, or beginner-friendly projects.

---

## ✨ Core Features

### 🛠️ Book Management

* 🧾 View all books in a dynamic table
* 📝 Edit book details
* ❌ Delete books with confirmation
* ➕ Add new books via a form
* 🔄 Real-time updates via API

### 📦 Borrow Books

* 🔢 Enter quantity (within availability)
* 🗓 Set due date
* ✅ Validations included
* 📉 Copies update accordingly
* 🚫 Book auto-marked as "Unavailable" if out of stock

### 📊 Borrow Summary

* 📚 Aggregated borrowed data
* 📌 Columns: Title, ISBN, Total Borrowed
* ✅ Tracks status instantly after borrow

---

## 🧭 App Routes

| Path              | Page Description                |
| ----------------- | ------------------------------- |
| `/books`          | All books table view            |
| `/create-book`    | Add a new book                  |
| `/edit-book/:id`  | Update book details             |
| `/borrow/:bookId` | Borrow form for a specific book |
| `/borrow-summary` | Summary of all borrowed books   |

---

## 🖼️ Screenshots

| 📚 Books List                      | ➕ Add Book                      |
|----------------------------------|--------------------------------|
| ![Books List](https://github.com/user-attachments/assets/941d8c19-0262-451f-aa77-5ffa69bfa37c) | ![Add Book](https://github.com/user-attachments/assets/de96ecd5-9c47-42d0-b930-af7b10e89d58) |

| 📦 Borrow Form                    | 📊 Borrow Summary               |
|---------------------------------|--------------------------------|
| ![Borrow Form](https://github.com/user-attachments/assets/d5552419-802d-4183-a71a-390ef9e36eac) | ![Borrow Summary](https://github.com/user-attachments/assets/4d0049cc-12c1-4014-914f-ad79af2bad0c) |




## 🔌 Backend API Overview

**Base URL**: `https://library-management2.vercel.app/api/`

| Method | Endpoint          | Action              |
| ------ | ----------------- | ------------------- |
| GET    | `/books`          | Fetch all books     |
| POST   | `/books`          | Add new book        |
| GET    | `/books/:id`      | Get single book     |
| PATCH  | `/books/:id`      | Update book         |
| DELETE | `/books/:id`      | Delete book         |
| POST   | `/borrow/:id`     | Borrow book         |
| GET    | `/borrow-summary` | Summary of borrowed |

---

## ⚙️ Tech Stack

| Layer      | Tools / Frameworks              |
| ---------- | ------------------------------- |
| Frontend   | React, TypeScript, Tailwind CSS |
| State Mgmt | Redux Toolkit + RTK Query       |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB with Mongoose           |
| Styling    | Tailwind CSS                    |

---

## 🗂️ Project Structure (Frontend)

```
LIBRARY_
│
├── .vercel/
├── dist/
├── node_modules/
├── public/
│
├── src/
│   ├── assets/
│   ├── Features/
│   ├── Home/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── redux/
│   │       ├── Hooks.ts
│   │       └── Store.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts

```

---

## 🧪 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/mainurrahat/Library_
cd Library_
npm install
```

### 2️⃣ Run Locally

```bash
npm run dev
```

✅ Make sure the backend is running and API URL is set in `fetchBaseQuery`.

---

## 📦 Build for Production

```bash
npm run build
```

> Use `npm start` only if you have a production server setup.

---

## 🌍 Backend Overview

### ✅ Main Models

* **Books**: title, author, genre, isbn, description, copies, availability
* **Borrows**: book ref, quantity, due date

### ✅ Features

* Full CRUD for books
* Borrow logic with quantity tracking
* Borrow summary endpoint
* Pagination-ready API structure

---

## 🙋‍♂️ About the Developer

**👨‍💻 Mainur Rahat**
📧 Email: [mainurrahat51@gmail.com](mailto:mainurrahat51@gmail.com)

🌐 GitHub: [github.com/mainurrahats-projects](https://www.linkedin.com/in/mainur-rahat-8159b8237/)

💼 LinkedIn: [linkedin.com/in/mainurrahat](https://linkedin.com/in/mainurrahat)

---

## 📢 Contributing

Feel free to fork, clone, and contribute by submitting a pull request. Suggestions and improvements are always welcome!

---

## 📜 License

This project is open-source and available under the [MIT License](./LICENSE).

---

## 🚀 Future Improvements

* 🔐 Authentication & role-based dashboards
* 🔎 Search and filtering
* 📈 Pagination and sorting
* 🌍 Multi-language support

---

