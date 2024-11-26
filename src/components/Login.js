import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import "../styles/Login.css";

const Login = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`${API_BASE_URL}/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("username", formData.username);
				navigate("/dashboard");
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			setError("Network error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-wrapper">
			<div className="background-shapes"></div>
			<div className="login-container">
				<div className="login-card card border-0 shadow-lg rounded-4 p-4">
					<div className="card-body p-4">
						<h1 className="welcome-text text-center mb-2">
							Welcome Back
						</h1>
						<p className="text-center text-muted mb-4">
							Sign in to continue your journey
						</p>

						{error && (
							<div className="custom-alert">
								<span>{error}</span>
								<button
									type="button"
									className="btn-close"
									onClick={() => setError("")}
									aria-label="Close"></button>
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="form-label"
									htmlFor="username">
									Username
								</label>
								<input
									type="text"
									className="form-control form-control-lg rounded-3"
									id="username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									placeholder="Enter your username"
									required
								/>
							</div>

							<div className="mb-4">
								<label
									className="form-label"
									htmlFor="password">
									Password
								</label>
								<input
									type="password"
									className="form-control form-control-lg rounded-3"
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									required
								/>
							</div>

							<button
								type="submit"
								className="btn btn-custom-primary w-100 rounded-3 mb-4 text-white"
								disabled={loading}>
								{loading ? (
									<span>
										<span
											className="spinner-border spinner-border-sm me-2"
											role="status"
											aria-hidden="true"></span>
										Signing in...
									</span>
								) : (
									"Sign In"
								)}
							</button>

							<p className="text-center mb-0">
								Don't have an account?{" "}
								<button
									onClick={() => navigate("/signup")}
									className="signup-link btn btn-link p-0">
									Create one now
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
