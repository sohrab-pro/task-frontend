import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { API_BASE_URL } from "../api/config";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
	const navigate = useNavigate();
	const [task, setTask] = useState({});
	const [color, setColor] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);

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

	const deleteTask = () => {
		fetch(`${API_BASE_URL}/tasks/${task.id}/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				console.log(response.status);
				if (response.status === 204) {
					navigate(-1);
				}
				return response;
			})
			.then((data) => {})
			.catch((error) => console.log(error));
	};

	const handleModalClose = () => {
		document.body.classList.remove("modal-open");
		setShowDeleteModal(false);
	};

	const handleModalOpen = () => {
		document.body.classList.add("modal-open");
		setShowDeleteModal(true);
	};

	const handleDeleteConfirm = () => {
		deleteTask();
		handleModalClose();
	};

	return (
		<div className="min-vh-100 bg-light">
			<Navbar navigate={navigate} />
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-10">
						<div className="card border-0 shadow-lg rounded-3">
							<div
								className="card-header border-0 bg-primary text-white p-4"
								style={{
									background:
										"linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
								}}>
								<button
									className="btn btn-light btn-sm rounded-pill px-3 hover-lift"
									onClick={() => navigate(-1)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-arrow-left me-2"
										viewBox="0 0 16 16">
										<path
											fillRule="evenodd"
											d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
										/>
									</svg>
									Back to Tasks
								</button>
								<h5 className="card-title display-6 fw-bold mb-0 mt-4">
									{task.title}
								</h5>
							</div>
							<div className="card-body p-4">
								<div className="bg-light rounded-3 p-4 mb-4">
									<p className="card-text fs-5 text-secondary mb-0">
										{task.description
											? task.description
											: "No description provided"}
									</p>
								</div>
								<div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
									<div
										className={`badge ${color} text-white px-4 py-2 rounded-pill fs-6`}>
										{task.status === "completed"
											? "Completed"
											: task.status === "pending"
											? "Pending"
											: "In Progress"}
									</div>
									<div className="d-flex gap-2">
										<button
											onClick={handleModalOpen}
											className="btn btn-danger btn-sm rounded-pill px-4 hover-lift">
											Delete
										</button>
										<button className="btn btn-info btn-sm text-white rounded-pill px-4 hover-lift">
											Edit Task
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showDeleteModal && (
				<>
					<div
						className="modal-backdrop show"
						onClick={handleModalClose}></div>
					<div
						className="modal show"
						style={{ display: "block" }}
						onClick={handleModalClose}>
						<div
							className="modal-dialog modal-dialog-centered"
							onClick={(e) => e.stopPropagation()}>
							<div className="modal-content border-0 shadow">
								<div className="modal-header border-0 bg-danger text-white">
									<h5 className="modal-title">
										Confirm Delete
									</h5>
									<button
										type="button"
										className="btn-close btn-close-white"
										onClick={handleModalClose}></button>
								</div>
								<div className="modal-body p-4">
									<p className="mb-0">
										Are you sure you want to delete this
										task? This action cannot be undone.
									</p>
								</div>
								<div className="modal-footer border-0">
									<button
										type="button"
										className="btn btn-secondary rounded-pill px-4 hover-lift"
										onClick={handleModalClose}>
										Cancel
									</button>
									<button
										type="button"
										className="btn btn-danger rounded-pill px-4 hover-lift"
										onClick={handleDeleteConfirm}>
										Delete Task
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			<style>
				{`
                    .hover-lift {
                        transition: all 0.2s ease;
                    }
                    .hover-lift:hover {
                        transform: translateY(-2px);
                    }
                    .card {
                        transition: transform 0.2s ease;
                    }
                    .card:hover {
                        transform: translateY(-3px);
                    }
                    .badge {
                        font-weight: 500;
                    }
                    .btn {
                        border: none;
                    }
                    .modal-backdrop {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 1040;
                    }
                    .modal {
                        z-index: 1045;
                    }
                    .modal-content {
                        border-radius: 1rem;
                    }
                    .modal-header {
                        border-radius: 1rem 1rem 0 0;
                    }
                `}
			</style>
		</div>
	);
};

export default ViewTask;
