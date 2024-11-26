import React from "react";

const DashboardCards = ({
	totalTasks,
	completedTasks,
	pendingTasks,
	inProgressTasks,
}) => {
	return (
		<>
			<div className="col-md-3 mb-4">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title text-info">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								fill="currentColor"
								className="bi bi-list-task"
								viewBox="0 0 16 16">
								<path
									fillRule="evenodd"
									d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
								/>
								<path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
								<path
									fillRule="evenodd"
									d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
								/>
							</svg>
							  Total Tasks
						</h5>
						<h2 className="card-text">{totalTasks}</h2>
					</div>
				</div>
			</div>
			<div className="col-md-3 mb-4">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title text-success">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-check2-square"
								viewBox="0 0 16 16">
								<path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
								<path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
							</svg>
							  Completed
						</h5>
						<h2 className="card-text">{completedTasks}</h2>
					</div>
				</div>
			</div>
			<div className="col-md-3 mb-4">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title text-danger">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-hourglass-split"
								viewBox="0 0 16 16">
								<path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
							</svg>
							  Pending
						</h5>
						<h2 className="card-text">{pendingTasks}</h2>
					</div>
				</div>
			</div>
			<div className="col-md-3 mb-4">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title text-warning">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-clock"
								viewBox="0 0 16 16">
								<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
								<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
							</svg>
							  In Progress
						</h5>
						<h2 className="card-text">{inProgressTasks}</h2>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardCards;
