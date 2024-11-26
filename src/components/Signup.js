import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import "../styles/Signup.css";

const Signup = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
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
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await fetch(`${API_BASE_URL}/signup/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("username", formData.username);
				navigate("/dashboard");
			} else {
				setError(data.error || "Signup failed");
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
							Create Account
						</h1>
						<p className="text-center text-muted mb-4">
							Start your journey with us
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
									placeholder="Choose a username"
									required
								/>
							</div>

							<div className="mb-4">
								<label className="form-label" htmlFor="email">
									Email
								</label>
								<input
									type="email"
									className="form-control form-control-lg rounded-3"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Enter your email"
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
									placeholder="Create a password"
									required
								/>
							</div>

							<div className="mb-4">
								<label
									className="form-label"
									htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control form-control-lg rounded-3"
									id="confirmPassword"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Confirm your password"
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
										Creating account...
									</span>
								) : (
									"Create Account"
								)}
							</button>

							<p className="text-center mb-0">
								Already have an account?{" "}
								<button
									onClick={() => navigate("/login")}
									className="login-link btn btn-link p-0">
									Sign in
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
