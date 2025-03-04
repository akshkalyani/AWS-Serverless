https://frontend-app-run4team1-frontend-devfe.shared.edp-dev.cloudmentor.academy/

# GYMx - Gym Application

GYMx is a gym management application that provides a platform for users to sign up, log in, view workouts, book sessions, and manage their profiles. Coaches can also manage their workouts and interact with clients through this app.

## Versioning Strategy

- **Major Version (2.x.x)**: Significant updates such as backend migration.
- **Minor Version (1.1.x)**: Feature additions that are backward-compatible.
- **Patch Version (x.x.0)**: Minor fixes or improvements that do not introduce breaking changes.

---

## Versions

### Version 3.0.1 (Latest Build)

#### Changed
- Backend API endpoints were updated to support the new deployment infrastructure (KuberocketCI).
- The backend was integrated with the frnotend, to make everything dynamic on the fronend side.
- Reports handler, reports sender, and background service statuses were updated to automatically reflect changes to the **KuberocketCI** platform.

#### Fixed
- API calls on the coach profile got mapped differently.
- Dark mode integrated to all the pages on the coach
- Booked workout from the coach profile.
- Handle errors during booking workout from the coach page

### Version 3.0.0

#### Added
- Migrated frontend hosting from AWS S3 bucket to the **KuberocketCI** platform.
- Migrated backend from AWS to **KuberocketCI** for improved deployment and scalability.

#### Changed
- Backend API endpoints were updated to support the new deployment infrastructure (KuberocketCI).
- Reports handler, reports sender, and background service statuses were updated to automatically reflect changes to the **KuberocketCI** platform.

#### Fixed
- Minor adjustments to ensure smooth interaction between frontend and the new backend platform.

---

### Version 2.0.0 (Backend Migration AWS - KuberocketCI)

#### New Features
1. **Backend Migration to Kuberocket**:
   - Migrated backend to **Kuberocket** with functionalities:
     - Sign-up and login functionalities.
     - Secure application with **AWS Cognito**.
     - Automatic role assignment (User/Coach).
     - Ability to view profile after login (for both User and Coach).
     - View all coaches on the user dashboard.
     - View available workouts based on time slot, coach, and workout types.
     - Book, cancel, view, and manage workouts (for both users and coaches).

#### Automation QA
1. **Testing Enhancements**:
   - Test Framework established.
   - Test Cases Report generated.
   - Test Plan and Strategy designed.

---

### Version 1.1.0

#### Features

1. **Book workout**:
   - Users can log in with **email** and **password**.
   - The user is able to search and book workout according to the preferences

2. **Workout Feedback**:
   - Users have the ability to rate the **workout** that is completed.
   - The coach can see the workout.

3. **Home Screen Filter**:
   - **Access Without Sign-In**: Users can explore available workouts even without signing in.
   - Displays a list of available **workouts**.
   - Basic **filtering** for workouts (if implemented).

4. **Navbar**:
   - Includes navigation links to **Home**, **Login**, **Sign Up**, **workouts**, **coaches** and **Profile**.

5. **Profile Management**:
   - Users can view and **edit profile information** in their **profile** after signing in.

---

### Version 1.0.0

#### Features

1. **Login Page**:
   - Users can log in with **email** and **password**.
   - The **Login** button is initially disabled until both fields are filled.
   - Basic **client-side validation** for the login form.

2. **Sign Up Page**:
   - Users can create an account by providing **email**, **password**, and **confirm password**.
   - Validates email format and ensures passwords match.

3. **Home Screen**:
   - **Access Without Sign-In**: Users can explore available workouts even without signing in.
   - Displays a list of available **workouts**.
   - Basic **filtering** for workouts (if implemented).

4. **Navbar**:
   - Includes navigation links to **Home**, **Login**, **Sign Up**, and **Profile** (if available).

5. **Profile Management**:
   - Users can view their **profile** after signing in.

---

## Technical Implementation

### Frontend Technologies
- **ReactJS**: Used for building reusable UI components.
- **Vite**: A modern, fast build tool for React applications.
- **Tailwind CSS**: A utility-first CSS framework used for styling and responsive design.
- **Material UI**: Component library for pre-built UI elements like buttons, forms, and modals.

### State Management
- **React Context**: Used for managing global states, such as authentication status.

### Routing
- **React Router**: Used for navigation between pages such as **Login**, **Sign Up**, and **Home**.

---

## License

This project is licensed under the **Apache License 2.0**.

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

Navigate to 
```bash 
http://localhost:5174
```
to view the app in your browser.