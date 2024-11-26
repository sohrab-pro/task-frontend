import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<PublicRoute>
						<Signup />
					</PublicRoute>
				}
			/>
			<Route
				path="*"
				element={
					localStorage.getItem("token") ? (
						<Navigate to="/" replace />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
		</Routes>
	);
}

export default App;
