# TRUE FEEDBACK - SECRET WHISPER

> A real-time, anonymous comment platform where users can share feedback, thoughts, and reactions on each other's profiles with complete control and transparency.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-9-green?style=flat-square)
![Real-time](https://img.shields.io/badge/Real--time-Socket.io-red?style=flat-square)

> ⚠️ **PROPRIETARY & CONFIDENTIAL** - This repository contains proprietary code. Unauthorized copying, modification, or publication is strictly prohibited. See [License](#-license) for details.

---

## 🎯 About

True-Feedback is a modern web platform that enables users to build their digital profiles and receive real-time feedback from the community. Whether it's constructive criticism, appreciation, or suggestions, True Feedback provides a safe and organized space for meaningful interactions.

Each user gets a shareable profile link where others can leave comments—without identity constraints. Comments can be toggled visible/hidden, giving profile owners full control over what's displayed.

---

## ✨ Key Features

- **User Authentication** - Secure signup/login with JWT-based authentication
- **Shareable Profiles** - Generate unique profile links to share with others
- **Real-time Comments** - Instant comment updates powered by Socket.io
- **Comment Management** - Toggle comment visibility and manage feedback
- **User Discovery** - Browse other user profiles and leave comments
- **Auto-generated Avatars** - Beautiful, consistent avatar generation with DiceBear
- **Responsive Design** - Mobile-first UI built with React and Tailwind CSS

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **File Upload**: Multer + Cloudinary
- **Password Security**: bcrypt

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io Client
- **Notifications**: React Hot Toast
- **Linting**: ESLint

---

## 📋 Project Structure

```
secret-whisper/
├── client/                    # React frontend
│   ├── src/
│   │   ├── api/              # API connectors & endpoints
│   │   ├── components/       # Reusable React components
│   │   ├── contexts/         # Context API providers (Auth, Comment, Socket)
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components (Home, Login, Signup, Profile)
│   │   └── utils/            # Utility functions
│   └── package.json
│
└── server/                    # Express backend
    ├── controllers/          # Business logic handlers
    ├── models/              # MongoDB schemas (User, Comment)
    ├── routes/              # API route definitions
    ├── middlewares/         # Express middlewares (auth, socketAuth)
    ├── configs/             # Configuration files (DB connection)
    ├── socket/              # Socket.io event handlers
    ├── index.js             # Application entry point
    └── package.json
```

---

## 🚀 Getting Started

> ⚠️ **IMPORTANT LEGAL NOTICE**: The following setup instructions are provided for **authorized personnel and evaluation purposes only**. By setting up this project, you agree that:
> - You are NOT permitted to redistribute, republish, or share this code
> - You are NOT permitted to use this as a base for your own projects
> - You are NOT permitted to claim ownership or authorship
> - This code remains the exclusive property of Data Master Consulting Pvt. Ltd.
> - Unauthorized distribution violates the proprietary license

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. **Clone the repository** *(For evalution purpose only)*
   ```bash
   git clone <repository-url>
   cd secret-whisper
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

   Create `.env` file:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```

   Create `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:4000/api/v1
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5173 in your browser

---

## 🔑 Core Functionalities

### Authentication
- User registration with encrypted passwords
- JWT-based session management
- Persistent login with HTTP-only cookies

### Profiles
- Custom user profiles with auto-generated avatars
- Unique shareable profile URLs
- Public/Private profile visibility management

### Comments
- Post comments on any public profile
- Real-time comment notifications via Socket.io
- Toggle comment visibility (visible/hidden)
- Comment deletion

### Real-time Updates
- Instant comment feeds using WebSockets
- Live user status updates
- No page refresh required

---

## 🔐 Security

- Password hashing with bcrypt
- JWT authentication for protected routes
- CORS enabled with specific origin restrictions
- Socket.io authentication middleware
- Input validation and sanitization

---

## 📦 Available Scripts

### Server
```bash
npm start    # Production build
npm run dev  # Development with nodemon
```

### Client
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🤝 Contribution

**This is a proprietary and confidential product owned by Aaditya Jujagar / Data Master Consulting Pvt. Ltd.** All rights reserved.

**No contributions are accepted.** This repository is made available for viewing and evaluation purposes only. You are NOT permitted to:
- Copy or fork this code
- Modify or create derivative works
- Publish, distribute, or sublicense this software
- Use this code for any purpose without prior written permission from the copyright holder

Any unauthorized use, reproduction, or distribution is strictly prohibited and subject to legal action.

For licensing and usage inquiries, please contact the project owner directly.

---

## 📄 License

**PROPRIETARY LICENSE - ALL RIGHTS RESERVED**

Copyright © 2026 Aaditya Jujagar / Data Master Consulting Pvt. Ltd. All rights reserved.

This repository and its contents are **proprietary and confidential**. The source code is made available publicly for viewing and evaluation purposes only.

**RESTRICTIONS:**
- ❌ You are **NOT** allowed to copy, clone, or fork this repository
- ❌ You are **NOT** allowed to modify, adapt, or create derivative works
- ❌ You are **NOT** allowed to publish, distribute, or sublicense any part of this software
- ❌ You are **NOT** allowed to use this code or product as your own in any form
- ❌ You are **NOT** allowed to commercialize or sell this software
- ❌ You are **NOT** allowed to use this code in your own projects without explicit written permission

No permission is granted for any of the above without prior written consent from the copyright holder. Any unauthorized use, reproduction, distribution, or modification of this software is strictly prohibited and will result in legal action.

For licensing inquiries or permission requests, contact the copyright holder directly.

---

## 💡 Future Enhancements

- Dark mode support
- Advanced comment filtering
- User following system
- Comment reactions (likes, emojis)
- Email notifications
- Advanced profile customization

---

## 📧 Support

For issues and feature requests, please contact the development team.

---

**Built with ❤️ by Aaditya Jujagar & Data Master Consulting.**

---

**© 2026 Aaditya Jujagar / Data Master Consulting Pvt. Ltd. All rights reserved. This is proprietary software. Unauthorized copying or modification is prohibited.**