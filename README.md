# 📝 Fullstack To-Do App

A full-featured fullstack To-Do List application built with:

- ⚛️ **Frontend**: React + TypeScript + Tailwind CSS + Axios + React Router
- 🔐 **Auth**: JWT Access/Refresh Tokens with HttpOnly cookies
- 🛠 **Backend**: Express.js + TypeScript + MongoDB + JWT
- 📦 **Monorepo**: Managed using `npm workspaces`

---

## 🚀 Features

### ✅ Authentication
- Signup, Login, Logout
- JWT access tokens (short-lived)
- Refresh tokens in secure HttpOnly cookies
- Token revocation on logout

### ✅ To-Do Functionality
- Create, Read, Update, Delete todos
- Filter by status (`pending`, `completed`)
- Mark complete/incomplete
- Only authenticated users can access their todos

---

## 📁 Monorepo Structure

```
fullstack-todo-app/
├── backend/            # Express + MongoDB + JWT API
├── frontend/           # React + Tailwind + Axios UI
├── README.md
```

---

## ⚙️ Installation & Running

### 1. Clone the repo

```bash
git clone https://github.com/IAMPAVANJ/kazam
cd kazam
```

### 2. Setup environment variables

Create `.env` files for backend:

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/todo-app
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
```

---

### 3. Install dependencies (root)

```bash
npm install
```

This installs for both `frontend` and `backend`.

---

### 4. Start the app

#### In parallel terminals or via tools like `concurrently`:

```bash
# Terminal 1
cd backend
npm start

# Terminal 2
cd ../frontend
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/user/`              | Create user              |
| POST   | `/user/`              | Login, set tokens        |
| POST   | `/user/logout`        | Revoke token, logout     |
| POST   | `/user/refresh-token` | Get new access token     |
| GET    | `/user/todo`          | List todos (auth)        |
| POST   | `/user/todo`          | Create todo              |
| PUT    | `/user/todo/:id`      | Update todo              |
| DELETE | `/user/todo/:id`      | Delete todo              |

---

## 🛡 Security Highlights

- Bcrypt password hashing
- JWT with expiration
- Refresh token stored in HttpOnly cookie
- Blacklist revoked refresh tokens (Mongo TTL index)

---

## 📬 Submission Guidelines

- ✅ Push to GitHub
- ✅ Add `.env.example`
- ✅ Write clear instructions in README (this file!)
- ✅ Deploy to Vercel / Render / Railway (optional)

---


## 🧑‍💻 Author

Made by [Pavan Jadhav] — Happy coding!