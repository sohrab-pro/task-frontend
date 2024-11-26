import React, { useState } from "react";

const Navbar = ({ navigate }) => {
	const [user] = useState(localStorage.getItem("username") || "User");
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<a href="/" className="navbar-brand">
					Dashboard
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="/"
								role="button"
								data-bs-toggle="dropdown">
								Welcome, {user}
							</a>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<button
										className="dropdown-item"
										onClick={handleLogout}>
										Logout
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
