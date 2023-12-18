# TasteOfIndiaHub App

Explore the TasteOfIndiaHub web application, where you can discover delicious recipes, read captivating blog posts, and connect with a vibrant community of chefs. The app is built using React, offering user authentication through Firebase and seamless navigation with React Router.

### Visit the Website

Click [here](https://taste-of-india-a9031.web.app/) to explore the TasteOfIndiaHub App.

### Overview

TasteOfIndiaHub is a feature-rich web application designed to provide users with an immersive culinary experience. From user-friendly authentication features to dynamic content navigation, the app is crafted for food enthusiasts and creators alike.

### Key Features

- **User Authentication:** Register, log in, and log out with ease. Enjoy a personalized experience with your name and profile picture displayed.

- **Navigation:** A sleek navigation bar provides quick access to various pages, including Home, Recipes, Blog, About, Login, and Register. Dynamic routing ensures a tailored experience.

- **Pages:**

  - **Home:** The main landing page showcasing the essence of the app.
  - **Recipes:** A curated collection of mouthwatering recipes.
  - **Blog:** Dive into engaging blog posts covering cooking and recipes.
  - **About:** Learn more about the application and its mission.
  - **Login and Register:** Secure authentication pages for user access.
  - **CheffsRecipe:** Explore recipes tailored to specific chefs.
  - **UserDetails:** Personalized user information and details.

- **Styling:** With Sass styling, the application boasts a visually appealing and responsive design.

### Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Avinash9694/TasteOfIndiaHub.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd TasteOfIndiaHub
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Firebase Configuration:**

   - Create a Firebase project and configure authentication.
   - Add a `.env` file in the project root with Firebase configuration details.

     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_MEASUREMENT_ID=your-measurement-id
     ```

5. **Start the Application:**
   ```bash
   npm start
   ```

### Dependencies

- **React:** A powerful JavaScript library for building user interfaces.
- **React Router:** Facilitates seamless navigation and routing within the application.
- **Firebase:** A versatile mobile and web application development platform offering authentication services.
- **React Toastify:** A notification library for displaying alerts and toasts.

### Scripts

- **start:** Launches the development server.
- **build:** Compiles the production-ready app for deployment.
- **eject:** Extracts the app from Create React App for customizable build configuration.

