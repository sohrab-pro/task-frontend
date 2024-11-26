import React from "react";

const AddTaskModal = ({ showModal, closeModal }) => {
	if (!showModal) return null;

	return (
		<div
			className="modal fade show"
			style={{ display: "block" }}
			tabIndex="-1"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create Task</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={closeModal}></button>
					</div>
					<div className="modal-body">
						<p>This is where you can add task details...</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={closeModal}>
							Close
						</button>
						<button type="button" className="btn btn-primary">
							Save Task
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
