# Task Management Frontend

A modern React-based frontend application for the Task Management system. This application provides a user-friendly interface for managing tasks, with features like user authentication, task creation, editing, and deletion.


## Features

- 🔐 User Authentication (Login/Signup)
- 📝 Create, Read, Update, and Delete Tasks
- 🎯 Task Status Management
- 📱 Responsive Design
- 🌙 Clean and Modern UI
- ⚡ Fast and Efficient Performance

## Tech Stack

- React 18+
- React Router v6
- Local Storage for token management
- CSS Modules for styling
- Bootstrap Icons

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Backend API server running

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-frontend.git
cd task-management-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your backend API URL:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Auth/          # Authentication related components
│   ├── Tasks/         # Task related components
│   └── UI/            # Generic UI components
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── services/          # API services
├── styles/            # Global styles and CSS modules
└── utils/             # Utility functions
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Component Documentation

### Authentication Components

#### Login
```jsx
<Login onSuccess={handleLoginSuccess} />
```
Props:
- `onSuccess`: Callback function called after successful login

#### Signup
```jsx
<Signup onSuccess={handleSignupSuccess} />
```
Props:
- `onSuccess`: Callback function called after successful signup

### Task Components

#### TaskList
```jsx
<TaskList onTaskSelect={handleTaskSelect} />
```
Props:
- `onTaskSelect`: Function to handle task selection

#### TaskForm
```jsx
<TaskForm task={selectedTask} onSubmit={handleSubmit} />
```
Props:
- `task`: Task object for editing (optional)
- `onSubmit`: Function to handle form submission

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in the `services` directory:

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
```

## State Management

The application uses React Context API for global state management. Authentication state and task data are managed through dedicated contexts:

```javascript
// contexts/AuthContext.js
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // Implementation
};
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API URL |

## Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the contents of the `build` directory to your hosting service.

Example deployment to Netlify:
```bash
npm install -g netlify-cli
netlify deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## Troubleshooting

Common issues and their solutions:

1. **API Connection Issues**
   - Verify the API URL in `.env` file
   - Check if the backend server is running
   - Verify CORS settings in the backend

2. **Authentication Issues**
   - Clear local storage
   - Check if the token is being sent correctly
   - Verify token expiration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Create React App team
- React Router team
- All other open-source contributors
