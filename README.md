# 📝 Blogster

Blogster is a full-stack blogging platform where users can create, read, and interact with blog posts.  
It’s built with **Express.js** for the backend, **MongoDB** for data storage, and uses **JWT (JSON Web Token)** for authentication.  
For the UI, it uses **EJS templates** styled with **Tailwind CSS**.

---

## 🚀 Features
- 🔑 **User Authentication** with JWT  
- 👤 **Account Creation** — users can sign up and log in  
- ✍️ **Create, edit, and delete blog posts** (only by logged-in users)  
- 📖 **Read blogs** — available to all users  
- 💬 **Comment on blogs** — users can share their thoughts  
- 🎨 **Responsive UI** with Tailwind CSS  
- 📄 **EJS templates** for dynamic views  
- 📦 MongoDB for data storage

---

## 🛠️ Tech Stack
- **Backend:** [Express.js](https://expressjs.com/)  
- **Authentication:** [JWT](https://jwt.io/)  
- **Database:** [MongoDB](https://www.mongodb.com/)  
- **Frontend:** [EJS](https://ejs.co/) + [Tailwind CSS](https://tailwindcss.com/)  

---

## ⚙️ Installation

Clone the repository:
```bash
git clone https://github.com/your-username/blogster.git
cd blogster
````

Install dependencies:

```bash
npm install
```

Set up environment variables (`.env` file):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

---

## 📸 Screenshots (optional)

*Add some screenshots of your UI here.*

---

## 📌 Future Improvements

* 🧑‍🤝‍🧑 User profiles & avatars
* 🔍 Search & filter blogs
* ❤️ Like & save functionality
* 📨 Email notifications for comments

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the MIT License.
