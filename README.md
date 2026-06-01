---

# 📝 Notes App (Full Stack Assignment)

A simple full-stack Notes application built using **Node.js, Express.js, and JSON file storage**.  
It allows users to create, read, update, and delete notes with a clean REST API and responsive frontend.

---

## 🚀 Features

- Create a new note
- View all notes
- Update existing notes
- Delete notes
- Persistent storage using JSON file
- RESTful API architecture
- Responsive frontend UI

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS (Tailwind CSS / Custom CSS)
- JavaScript

**Backend:**
- Node.js
- Express.js
- UUID for unique IDs
- File System (JSON storage)

---

## 📁 Project Structure

```

PROJECT ROOT
│
├── backend/
│   └── notes-api/
│       ├── controller/
│       │   └── (controller files)
│       │
│       ├── data/
│       │   └── (database/json files)
│       │
│       ├── node_modules/
│       │
│       ├── routes/
│       │   └── (route files)
│       │
│       ├── utils/
│       │   └── (utility/helper files)
│       │
│       ├── Notes Assignment (1).pdf
│       ├── package.json
│       ├── package-lock.json
│       └── server.js
│
├── core/
│
├── frontend/
│   └── notes-frontend/
│       ├── .vite/
│       ├── node_modules/
│       ├── public/
│       │
│       ├── src/
│       │   ├── assets/
│       │   │
│       │   ├── components/
│       │   │
│       │   ├── services/
│       │   │
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── README.md
│       └── vite.config.js
│
├── .gitignore
└── README.md

````

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
````

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Start Backend Server

```bash
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

### 4. Run Frontend

npm install

npm run dev

```
http://localhost:5173
```



---

## 📡 API Endpoints

### Create Note

```
POST /api/notes
```

### Get All Notes

```
GET /api/notes
```

### Update Note

```
PUT /api/notes/:id
```

### Delete Note

```
DELETE /api/notes/:id
```

---

## 📦 Sample Request Body

```json
{
  "title": "My First Note",
  "content": "This is a sample note content"
}
```

---

## 🧪 Testing API (Postman)

You can test all APIs using Postman:

* Base URL: `http://localhost:5000/api/notes`
* Use JSON body for POST & PUT requests
* Set header:


---
