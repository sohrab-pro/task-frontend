import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

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
		<div className="container-fluid bg-light min-vh-100">
			<div className="row justify-content-center align-items-center min-vh-100">
				<div className="col-sm-12 col-md-6 col-lg-4">
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h2 className="text-center mb-4">Welcome Back</h2>

							{error && (
								<div
									className="alert alert-danger"
									role="alert">
									{error}
								</div>
							)}

							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label
										htmlFor="username"
										className="form-label">
										Username
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										name="username"
										value={formData.username}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="mb-3">
									<label
										htmlFor="password"
										className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
								</div>

								<button
									type="submit"
									className="btn btn-primary w-100 mb-3"
									disabled={loading}>
									{loading ? (
										<span>
											<span
												className="spinner-border spinner-border-sm me-2"
												role="status"
												aria-hidden="true"></span>
											Logging in...
										</span>
									) : (
										"Login"
									)}
								</button>
							</form>

							<p className="text-center mt-3">
								Don't have an account?{" "}
								<button
									onClick={() => navigate("/signup")}
									className="btn btn-link p-0">
									Sign up
								</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
