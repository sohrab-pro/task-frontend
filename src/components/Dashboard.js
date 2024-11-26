import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import TaskRow from "./TaskRow";
import DashboardCards from "./DashboardCards";
import Navbar from "./Navbar";
import AddTaskModal from "./AddTaskModal";
import "../styles/Dashboard.css";

const Dashboard = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [totalTasks, setTotalTasks] = useState(0);
	const [completedTasks, setCompletedTasks] = useState(0);
	const [pendingTasks, setPendingTasks] = useState(0);
	const [inProgressTasks, setInProgressTasks] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const statusChangeHandler = async (current_status, new_status) => {
		const statusMap = {
			completed: setCompletedTasks,
			pending: setPendingTasks,
			in_progress: setInProgressTasks,
		};

		if (statusMap[current_status])
			statusMap[current_status]((prev) => prev - 1);
		if (statusMap[new_status]) statusMap[new_status]((prev) => prev + 1);
	};

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/tasks/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setTasks(data);
					setTotalTasks(data.length);
					setCompletedTasks(
						data.filter((task) => task.status === "completed")
							.length
					);
					setPendingTasks(
						data.filter((task) => task.status === "pending").length
					);
					setInProgressTasks(
						data.filter((task) => task.status === "in_progress")
							.length
					);
				} else {
					console.error("Error fetching tasks");
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchTasks();
	}, []);

	return (
		<div className="min-vh-100 bg-light">
			<Navbar navigate={navigate} />
			<div className="container py-5">
				<div className="row g-4">
					<DashboardCards
						totalTasks={totalTasks}
						completedTasks={completedTasks}
						pendingTasks={pendingTasks}
						inProgressTasks={inProgressTasks}
					/>
					<div className="col-12">
						<div className="card border-0 shadow-sm rounded-3">
							<div className="card-body p-4">
								<div className="row align-items-center mb-4">
									<div className="col-sm-6">
										<h5 className="card-title fs-4 fw-bold mb-0">
											Tasks
											<span className="badge bg-primary rounded-pill ms-2 fw-normal">
												{totalTasks}
											</span>
										</h5>
									</div>
									<div className="col-sm-6 text-sm-end mt-3 mt-sm-0">
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
								</div>

								<div className="table-responsive">
									<table className="table table-hover align-middle">
										<thead className="table-light">
											<tr>
												<th className="border-0 rounded-start">
													Date
												</th>
												<th className="border-0">
													Title
												</th>
												<th className="border-0">
													Description
												</th>
												<th className="border-0">
													Status
												</th>
												<th className="border-0 rounded-end">
													Action
												</th>
											</tr>
										</thead>
										<tbody>
											{tasks.length > 0 ? (
												tasks.map((task) => (
													<TaskRow
														key={task.id}
														task={task}
														navigate={navigate}
														statusChangeHandler={
															statusChangeHandler
														}
													/>
												))
											) : (
												<tr>
													<td
														colSpan="5"
														className="text-center py-5 text-muted">
														<div className="py-4">
															<p className="mb-0 fs-5">
																No tasks found
															</p>
															<p className="small mb-0">
																Create your
																first task to
																get started
															</p>
														</div>
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<AddTaskModal showModal={showModal} closeModal={closeModal} />
			</div>
		</div>
	);
};

export default Dashboard;
