import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import TaskRow from "./TaskRow";
import DashboardCards from "./DashboardCards";
import Navbar from "./Navbar";
import AddTaskButton from "./AddTaskButton";

const Dashboard = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [totalTasks, setTotalTasks] = useState(0);
	const [completedTasks, setCompletedTasks] = useState(0);
	const [pendingTasks, setPendingTasks] = useState(0);
	const [inProgressTasks, setInProgressTasks] = useState(0);

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
			<div className="container py-4">
				<div className="row">
					<DashboardCards
						totalTasks={totalTasks}
						completedTasks={completedTasks}
						pendingTasks={pendingTasks}
						inProgressTasks={inProgressTasks}
					/>
					<div className="col-12">
						<div className="card">
							<div className="card-body row">
								<div className="col-sm-6">
									<h5 className="card-title">Tasks</h5>
								</div>
								<div className="col-sm-6">
									<AddTaskButton />
								</div>
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th>Date</th>
												<th>Title</th>
												<th>Description</th>
												<th>Status</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{tasks.map((task) => (
												<TaskRow
													key={task.id}
													task={task}
													navigate={navigate}
												/>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
