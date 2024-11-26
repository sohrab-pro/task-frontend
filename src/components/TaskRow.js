import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api/config";

const TaskRow = ({ task, navigate, statusChangeHandler }) => {
	const [color, setColor] = useState("");
	const [status, setStatus] = useState(task.status);

	const taskChange = async (current_status, new_status) => {
		try {
			const response = await fetch(`${API_BASE_URL}/tasks/${task.id}/`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ status: new_status }),
			});
			if (response.ok) {
				setStatus(new_status);
				task.status = new_status;
				statusChangeHandler(current_status, new_status);
			} else {
				console.log("Error updating task status");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (task.status === "completed") {
			setColor("bg-success");
			setStatus("Completed");
		} else if (task.status === "pending") {
			setColor("bg-danger");
			setStatus("Pending");
		} else {
			setColor("bg-warning");
			setStatus("In Progress");
		}
	}, [task.status]);
	return (
		<tr>
			<td>{task.created_at}</td>
			<td>{task.title}</td>
			<td>{task.description}</td>
			<td>
				<select
					className={`badge ${color}`}
					onChange={(event) =>
						taskChange(task.status, event.target.value)
					}
					value={task.status}>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
					<option value="in_progress">In Progress</option>
				</select>
			</td>
			<td>
				<button
					className="btn btn-sm btn-icon btn-info"
					onClick={() => {
						navigate(`/task/${task.id}`);
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-eye"
						viewBox="0 0 16 16">
						<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
						<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
					</svg>
				</button>
			</td>
		</tr>
	);
};

export default TaskRow;
