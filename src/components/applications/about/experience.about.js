import React from "react";
import "./about.scss";
import upworkAvatar from "../../../assets/images/baseImages/upwork_prof.png";
import user from "../../../utils/data/user.config";
import LazyImage from "../../base/lazyImage";
import { Helmet } from "react-helmet-async";


function Experience() {
	return (
		<div className="experience-container">
			<Helmet>
				<title>Experience | Arnold Adero - AI-Augmented Engineer & Technical PM</title>
				<meta
					name="description"
					content="Verified work history and client reviews. 10+ years on Upwork as a Top-Rated Plus Full-Stack Developer specializing in AI-augmented workflows."
				/>
				<link rel="canonical" href="https://arnoldadero.onrender.com/experience" />
			</Helmet>
			<div className="experience-header">
				<h3 className="experience-title">
					{user.firstName} {user.lastName} - Upwork Profile
				</h3>
				<p className="experience-subtitle">Top Rated Freelancer</p>
			</div>

			<div className="experience-image-wrapper">
				<LazyImage
					src={upworkAvatar}
					alt={`${user.firstName} ${user.lastName} Upwork Profile`}
					className="experience-full-image"
				/>
			</div>

			<div className="experience-cta">
				<p>Check out my full work history, client reviews, and portfolio on Upwork.</p>
				<a
					href="https://www.upwork.com/freelancers/arnoldadero"
					target="_blank"
					rel="noopener noreferrer"
					className="experience-button"
				>
					View Upwork Profile
				</a>
			</div>
		</div>
	);
}

export default Experience;
