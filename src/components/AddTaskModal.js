import React, { useState } from "react";
import { API_BASE_URL } from "../api/config";

const AddTaskModal = ({ showModal, closeModal }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	if (!showModal) return null;

	const submitTask = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${API_BASE_URL}/tasks/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					title: title,
					description: description,
					status: "pending",
				}),
			});

			if (response.ok) {
				closeModal();
				window.location.reload();
			} else {
				console.log("Error adding task!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalClose = () => {
		document.body.classList.remove("modal-open");
		closeModal();
	};

	return (
		<div className="modal-wrapper">
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
						<div className="modal-header border-0 bg-primary text-white">
							<h5 className="modal-title fw-semibold">
								Create New Task
							</h5>
							<button
								type="button"
								className="btn-close btn-close-white"
								onClick={handleModalClose}></button>
						</div>
						<form onSubmit={submitTask}>
							<div className="modal-body p-4">
								<div className="row g-4">
									<div className="col-12">
										<div className="form-floating">
											<input
												type="text"
												name="title"
												id="taskTitle"
												value={title}
												onChange={(e) =>
													setTitle(e.target.value)
												}
												className="form-control border-0 bg-light"
												placeholder="Enter task title"
												required
											/>
											<label htmlFor="taskTitle">
												Task Title
											</label>
										</div>
									</div>
									<div className="col-12">
										<div className="form-floating">
											<textarea
												className="form-control border-0 bg-light"
												placeholder="Enter task description"
												id="taskDescription"
												style={{ height: "120px" }}
												onChange={(e) =>
													setDescription(
														e.target.value
													)
												}
												value={description}></textarea>
											<label htmlFor="taskDescription">
												Task Description
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer border-0">
								<button
									type="button"
									className="btn btn-secondary rounded-pill px-4 hover-lift"
									onClick={handleModalClose}>
									Cancel
								</button>
								<button
									type="submit"
									className="btn btn-primary rounded-pill px-4 hover-lift">
									Create Task
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<style>
				{`
                    .modal-wrapper {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        z-index: 1050;
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
                        background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
                    }
                    .hover-lift {
                        transition: all 0.2s ease;
                    }
                    .hover-lift:hover {
                        transform: translateY(-2px);
                    }
                    .form-control {
                        border-radius: 0.75rem;
                        padding: 0.75rem 1rem;
                        transition: all 0.2s ease;
                    }
                    .form-control:focus {
                        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
                    }
                    .form-floating > .form-control {
                        padding: 1rem;
                        height: calc(3.5rem + 2px);
                    }
                    .form-floating > textarea.form-control {
                        height: 120px;
                    }
                    .form-floating > label {
                        padding: 1rem;
                    }
                `}
			</style>
		</div>
	);
};

export default AddTaskModal;
