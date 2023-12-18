## TasteOfIndiaHub

### Overview

This is a web application built using React that allows users to explore recipes, read blog posts, and engage with a community of chefs. The app also provides user authentication for features such as user registration and login. Firebase is used for authentication, and the application utilizes React Router for navigation.

### Features

- **User Authentication:** Users can register, log in, and log out. The app provides a personalized experience by displaying the user's name and profile picture.

- **Navigation:** The app includes a navigation bar with links to different pages, such as Home, Recipes, Blog, About, Login, and Register. It also features dynamic routing for chef-specific recipes and a user details page.

- **Pages:**

  - **Home:** The main landing page of the app.
  - **Recipes:** Displays a collection of recipes.
  - **Blog:** Presents blog posts related to cooking and recipes.
  - **About:** Information about the application and its purpose.
  - **Login and Register:** Authentication pages for users to log in or create an account.
  - **CheffsRecipe:** Displays recipes specific to a chef.
  - **UserDetails:** User-specific details and information.

- **Styling:** The application uses Sass for styling, providing a visually appealing and responsive design.

### Installation and Setup

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Avinash9694/TasteOfIndiaHub.git
   ```

2. Navigate to the project directory.

   ```bash
   cd recipe-app
   ```

3. Install dependencies using npm.

   ```bash
   npm install
   ```

4. Create a Firebase project and configure authentication.

5. Create a `.env` file in the project root and add Firebase configuration details.

   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_MEASUREMENT_ID=your-measurement-id
   ```

6. Start the application.
   ```bash
   npm start
   ```

### Dependencies

- **React:** A JavaScript library for building user interfaces.
- **React Router:** Provides navigation and routing functionality for the React application.
- **Firebase:** A mobile and web application development platform with authentication services.
- **React Toastify:** A notification library for displaying alerts and toasts.

### Scripts

- **start:** Starts the development server.
- **build:** Builds the production-ready app for deployment.
- **eject:** Ejects the app from Create React App, allowing customization of build configuration.
