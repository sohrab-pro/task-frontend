import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const AddTaskButton = () => {
	return (
		<>
			<div>
				<button
					type="button"
					className="btn btn-sm btn-primary float-end"
					onClick={openModal}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						fill="currentColor"
						className="bi bi-plus"
						viewBox="0 0 16 16">
						<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
					</svg>
					&nbsp;Add Task
				</button>
			</div>
		</>
	);
};

export default AddTaskButton;
