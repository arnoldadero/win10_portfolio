import React from "react";
import avatar from "../../../assets/images/baseImages/default_avatar.svg";
import user from "../../../utils/data/user.config";
import LazyImage from "../../base/lazyImage";
import './about.scss';

import { Helmet } from "react-helmet-async";

function AboutMe() {
	return (
		<div className="about-app-container">
			<Helmet>
				<title>About Me | Arnold Adero - Senior React & Node.js Developer</title>
				<meta
					name="description"
					content="I am a Senior Full-Stack Engineer in Kenya with 10+ years of experience. I build high-performance web applications using modern tech stacks."
				/>
				<link rel="canonical" href="https://arnoldadero.onrender.com/about" />
			</Helmet>
			<div className="about-content">
				<div className="about-profile-card">
					<div className="about-avatar-section">
						<LazyImage
							className="about-avatar"
							width="120"
							height="120"
							src={
								user.userImage !== undefined &&
									user.userImage !== null &&
									user.userImage !== ""
									? user.userImage
									: avatar
							}
							alt="user"
						/>
						<p className="about-name">
							Hey, I'm {user.firstName} {user.lastName}
						</p>
						{user.aboutMe.intro && (
							<p className="about-intro">
								{user.aboutMe.intro}
							</p>
						)}
					</div>
					{user.aboutMe.description && (
						<div className="about-description">
							{user.aboutMe.description}
						</div>
					)}

					{user.aboutMe.outro && (
						<div className="about-outro">
							{user.aboutMe.outro}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
