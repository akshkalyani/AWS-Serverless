# Gym App - Frontend Documentation

## Overview

This document outlines the frontend design and implementation details for the **Gym App**. The app is built using **ReactJS**, **Vite**, **Tailwind CSS**, and **Material UI**. We employ **Vitest** for frontend testing, and the backend is powered by **.NET 8** and hosted on **KuberocketCI**. This app allows users to explore and book workouts, manage profiles, and engage with coaches.

## Features

### 1. **Login Page**
   - **Validation**: Form validation is handled using **Zod** resolver.
   - **Fields**: Requires **email** and **password** input.
   - **Button Disabled State**: The **Login** button is disabled until both email and password fields are filled.
   - **Flow**: On successful login, users are redirected to the **Home Screen**.

### 2. **Sign Up Page**
   - **Validation**:
     - **Email**: Validates for a proper email format.
     - **Password**: Requires at least 8 characters with at least one uppercase letter.
   - **Dropdowns**:
     - **Activity**: Select an activity (e.g., Fitness, Yoga).
     - **Goal**: Select a fitness goal (e.g., Weight Loss, Strength Training).
   - **Create Account**: The **Create Account** button is enabled when all required fields are valid. Upon successful account creation, the user is redirected to the **Home Screen**.

### 3. **Home Screen**
   - **Access Without Sign-In**: Users can access the home screen and explore workout filters without being logged in.
   - **Workout Filters**: Allows users to filter workouts based on activity, difficulty, and duration.
   - **Get Workouts Button**: When clicked, the list of available workouts is displayed based on the filters selected.
   - **Workout Details**:
     - Displays **coach profiles** alongside each workout.
     - **Book Workout** button to book a workout.
   - **Book Workout Flow**:
     - **If Logged In**: A confirmation pop-up appears to confirm the booking.
     - **If Not Logged In**: A pop-up prompts the user to log in before proceeding to the login page.
   - **Confirmation**: A **Snackbar** notification confirms the booking after successful submission.

### 4. **Coach Page**
   - **Coach Information**:
     - Displays the coach’s **experience** and **certifications**.
     - Shows the sport that the coach specializes in.
   - **Available Slots**: Users can select a date from the calendar to view the coach’s available time slots.

### 5. **Navbar**
   - **Navigation Links**: The navbar contains links to:
     - **Available Coaches**: A list of all coaches.
     - **Booked Workouts**: A section to view previously booked workouts.

### 6. **Booked Workouts**
   - **View Bookings**: Users can see a list of their booked workouts.
   - **Cancel Bookings**: Users can cancel a previously booked workout.
   - **Provide Feedback**: After a completed workout, users can provide feedback including ratings and comments.

### 7. **Feedback for Completed Workouts**
   - **Feedback Form**: After a workout is completed, users can provide feedback and rate the workout.

### 8. **Theme Toggle (Light/Dark Mode)**
   - **Theme Switch**: Users can toggle between **light** and **dark** themes, providing a personalized visual experience.
   - **Persistence**: The theme preference is saved and retained across sessions.

### 9. **Language Preference (Beta)**
   - **Language Switcher**: Users can change the app language, though this feature is in beta due to limited API credits.
   - **Supported Languages**: Currently supports a limited number of languages.

### 10. **Profile Management**
   - **Profile Tooltip**: Users can access profile settings via a tooltip in the navbar.
   - **Editable Fields**:
     - **Change Name** and **Surname**.
     - **Update Password**.
   - **Save Changes**: Changes made to the user’s profile are submitted and saved via backend API calls.

---

## Technical Implementation

### 1. **Frontend Technologies**
   - **ReactJS**: Core framework for building user interfaces.
   - **Vite**: Fast build tool and development server for React applications.
   - **Tailwind CSS**: Utility-first CSS framework for responsive design.
   - **Material UI**: Component library for pre-designed UI elements like buttons, forms, and modals.

### 2. **Form Validation**
   - **Zod**: Schema-based validation for the login and signup forms ensures that all inputs meet the required format before submission.

### 3. **State Management**
   - **React Context**: Used for global state management, such as theme preferences and user authentication status.
   - **React Router**: Provides navigation across pages such as login, signup, home, and profile management.

### 4. **API Integrations**
   - **Authentication**: Integration with backend services (such as AWS Cognito) for handling user authentication, registration, and session management.
   - **Workout Management**: API calls to fetch workout details, book workouts, and retrieve available coaches.
   - **Profile Management**: Users can update their personal data (name, password, etc.) via API requests to the backend.

### 5. **Testing**
   - **Vitest**: Used for writing unit and integration tests to ensure UI components and business logic function correctly.

### 6. **UI/UX**
   - **Responsive Design**: Mobile-first approach ensures the app adapts to various screen sizes using Tailwind CSS.
   - **Material UI**: Provides consistent and accessible components that improve the user experience.

---

## Known Issues & Future Improvements

- **Language Support**: The language switch feature is in beta due to limited API credits. We plan to expand language support once credits are increased.
- **Offline Mode**: Future enhancement to support offline mode for users to access previously loaded content when the network is unavailable.
- **Real-Time Notifications**: In the future, we plan to extend real-time notifications for workout updates, cancellations, and reminders.

---

## Conclusion

The **Gym App** provides a comprehensive and engaging experience for users looking to book workouts and interact with coaches. With features such as user authentication, workout booking, profile management, feedback submission, and customizable themes, the app delivers a seamless experience. The ongoing development of features like language support and offline mode will further improve the user experience.

---

## How to Run the App Locally

Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gym-app.git
   cd gym-app
   ```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

4. Navigate to 
```bash 
http://localhost:5173/home
```
to view the app in your browser.