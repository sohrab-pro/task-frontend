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
git clone https://github.com/sohrab-pro/task-frontend.git
cd task_frontend
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

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## Troubleshooting

Common issues and their solutions:

1. **API Connection Issues**
   - Verify the API URL in src/api/config.js file
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
