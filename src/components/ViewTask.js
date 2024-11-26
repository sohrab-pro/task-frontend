import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { API_BASE_URL } from "../api/config";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
	const navigate = useNavigate();
	const [task, setTask] = useState({});
	const [color, setColor] = useState("");

	useEffect(() => {
		const id = window.location.pathname.split("/").pop();
		fetch(`${API_BASE_URL}/tasks/${id}/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTask(data);
				setColor(
					data.status === "completed"
						? "bg-success"
						: data.status === "pending"
						? "bg-danger"
						: "bg-warning"
				);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="min-vh-100 bg-light">
			<Navbar navigate={navigate} />
			<div className="container py-4">
				<div className="row">
					<div className="col-sm-12">
						<div className="card shadow-sm">
							<div className="card-header bg-primary text-white">
								<div className="row">
									<div className="col-12">
										<button
											className="btn btn-light btn-sm"
											onClick={() => navigate(-1)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-arrow-left"
												viewBox="0 0 16 16">
												<path
													fillRule="evenodd"
													d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
												/>
											</svg>{" "}
											Go Back
										</button>
										<h5 className="card-title fs-3 mb-0 mt-3">
											{task.title}
										</h5>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="card-text">
									{task.description
										? task.description
										: "No description"}
								</p>
								<div className="d-flex justify-content-between align-items-center mt-3">
									<div
										className={`badge ${color} text-white fs-6`}>
										{task.status == "completed"
											? "Completed"
											: task.status == "pending"
											? "Pending"
											: "In Progress"}
									</div>
									<button className="btn btn-danger btn-sm">
										Delete
									</button>
									<button className="btn btn-info btn-sm">
										Edit Task
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewTask;
