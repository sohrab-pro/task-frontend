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
	return (
		<div
			className="modal fade show"
			style={{ display: "block" }}
			tabIndex="-1"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Task</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={closeModal}></button>
					</div>
					<form method="post" onSubmit={submitTask}>
						<div className="modal-body">
							<div className="row">
								<div className="col-sm-12">
									<div className="mb-3">
										<label className="form-label">
											Title
										</label>
										<input
											type="text"
											name="title"
											value={title}
											onChange={(e) =>
												setTitle(e.target.value)
											}
											className="form-control"
											placeholder="Enter task title"
											required
										/>
									</div>
								</div>
								<div className="col-sm-12">
									<div className="mb-3">
										<label className="form-label">
											Description
										</label>
										<textarea
											className="form-control"
											placeholder="Enter task description"
											onChange={(e) =>
												setDescription(e.target.value)
											}
											value={description}></textarea>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={closeModal}>
								Close
							</button>
							<button type="submit" className="btn btn-primary">
								Save Task
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
