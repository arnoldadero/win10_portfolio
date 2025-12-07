import React from "react";
import user from "../../utils/data/user.config";
import "./socialBlock.scss";
import twitter from "../../assets/images/social/twitter.svg";
import linkedin from "../../assets/images/social/linkedin.svg";
import github from "../../assets/images/social/github.svg";
import upwork from "../../assets/images/social/upwork.svg";
import email from "../../assets/images/social/email.png";
import { analytics } from "../../utils/firebaseConfig";
import LazyImage from "./lazyImage";
import { logEvent } from "firebase/analytics";
import { ANALYTICS_EVENTS } from "../../utils/documents/enums";
import projectConfig from "../../utils/data/project.config";

function SocialBlock() {
	const handleSocialClick = (socialLink) => {
		if (projectConfig.enableAnalytics && analytics) {
			logEvent(analytics, ANALYTICS_EVENTS.SOCIAL_CLICK, {
				link: socialLink,
			});
		}
	};

	const socialLinks = [
		{
			condition: user.gitHub,
			url: `https://github.com/${user.gitHub}`,
			icon: github,
			alt: "Github Profile",
			label: "GitHub"
		},
		{
			condition: user.twitter,
			url: `https://twitter.com/${user.twitter}`,
			icon: twitter,
			alt: "Twitter Profile",
			label: "Twitter"
		},
		{
			condition: user.linkedIn,
			url: `https://www.linkedin.com/${user.linkedIn}`,
			icon: linkedin,
			alt: "LinkedIn Profile",
			label: "LinkedIn"
		},
		{
			condition: user.upwork,
			url: `https://www.upwork.com/freelancers/${user.upwork}`,
			icon: upwork,
			alt: "Upwork Profile",
			label: "Upwork"
		},
		{
			condition: user.email,
			url: `mailto:${user.email}`,
			icon: email,
			alt: "Email Me",
			label: "Email"
		}
	];

	return (
		<div className="social-block">
			{socialLinks.map((social, index) => {
				if (!social.condition) return null;
				return (
					<a
						key={index}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link"
						aria-label={social.label}
						onClick={() => handleSocialClick(social.url)}
						uk-tooltip={social.label}
					>
						<LazyImage
							src={social.icon}
							width="40"
							height="40"
							alt={social.alt}
							className="uk-img"
						/>
					</a>
				);
			})}
		</div>
	);
}

export default SocialBlock;
