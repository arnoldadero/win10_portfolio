import React from "react";
import "./about.scss";
// import avatar from "../../../assets/images/baseImages/default_avatar.svg"; // Unused now
import user from "../../../utils/data/user.config";


function Experience() {
	return (
		<div className="uk-flex uk-flex-center uk-flex-middle" style={{ height: "100%" }}>
			<div className="profile-card uk-text-center uk-card uk-card-secondary uk-card-body" style={{ borderRadius: "8px", maxWidth: "400px", background: "#1e1e1e" }}>
				<div className="uk-margin-bottom">
					<img
						src={user.userImage}
						alt={`${user.firstName} ${user.lastName}`}
						className="uk-border-circle"
						style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #4fc1e9" }}
					/>
				</div>
				<h3 className="uk-text-bold uk-margin-remove-bottom" style={{ color: "#fff" }}>
					{user.firstName} {user.lastName}
				</h3>
				<p className="uk-text-meta uk-margin-remove-top" style={{ color: "#aaa" }}>
					Top Rated Freelancer
				</p>

				<p className="uk-margin">
					Check out my full work history, client reviews, and portfolio on Upwork.
				</p>

				<a
					href="https://www.upwork.com/freelancers/arnoldadero"
					target="_blank"
					rel="noopener noreferrer"
					className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
					style={{ borderRadius: "4px", background: "#4fc1e9", color: "#fff", border: "none" }}
				>
					View Upwork Profile
				</a>
			</div>
		</div>
	);
}

export default Experience;
