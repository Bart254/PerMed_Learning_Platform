# PerMed Learning Platform

PerMed (Personalized Medical Education) is a web-based platform designed to provide users with personalized health education. The platform focuses on delivering articles, videos, and quizzes on specific health topics, such as diabetes and hypertension. Users can select topics of interest, learn through curated content, and test their knowledge with interactive quizzes.

---

## Features

1. **User Authentication**
   - Users can sign up, log in, and log out.
   - Authentication is token-based using cookies for secure session management.

2. **Personalized Learning**
   - Users can choose health topics (e.g., diabetes, hypertension) to receive tailored content.
   - Topics can be added or removed dynamically.

3. **Articles**
   - Articles on health topics are displayed with summaries.
   - Clicking on an article expands it to show the full content.
   - Articles are retrieved from a MongoDB database and displayed in a user-friendly format.

4. **Videos**
   - Video thumbnails are shown for selected topics.
   - Clicking a thumbnail plays the video in fullscreen.
   - Video metadata (e.g., title and URL) is dynamically fetched from a database.


6. **Responsive Design**
   - The platform is fully responsive and works on mobile, tablet, and desktop devices.
   - Styled using a mix of W3.CSS and custom styles to ensure a clean, minimalistic layout.

7. **Secure Session Handling**
   - Cookies are used to persist tokens across pages.
   - Pages with sensitive data automatically redirect unauthenticated users to the homepage.

---

## Technologies Used

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** for database management
- **JWT** for token-based authentication
- **Cookie-Parser** for session handling

### Frontend:
- HTML5, CSS3, JavaScript (with jQuery and AJAX)
- W3.CSS for responsive and accessible design
- FontAwesome for icons

### Tools and Libraries:
- **Bcrypt.js** for password hashing
- **Dotenv** for environment variable management

---

## Installation and Setup

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (local or cloud-based)

### Steps to Install:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/permed-learning-platform.git
   cd permed-learning-platform

2. create a .env file with the following details
 
	JWT_SECRET=your_jwt_secret
	PORT=5000

3. cd to backend and Install dependencies
 ```bash
  cd backend
  npm install

4. Start your server
 ```bash
  npm run start-server

5. change directory to frontend
 open the index.html with your browser

 ```bash
  npm run start-server

