import { PrimaryButton } from "@fluentui/react";
import React, { useState, useEffect } from "react";
import projectConfig from "../../../utils/data/project.config";
import user from "../../../utils/data/user.config";
import { ANALYTICS_EVENTS } from "../../../utils/documents/enums";
import { logEvent } from "../../../analytics/ga";

import { Helmet } from "react-helmet-async";

function Resume() {
	// Only render PDF on client to avoid react-snap/minimalcss issues
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const downloadIcon = { iconName: "DownloadDocument" };
	const onDownloadClick = (resume) => {
		if (projectConfig.enableAnalytics) {
			logEvent("Resume", ANALYTICS_EVENTS.DOWNLOAD_RESUME, resume);
		}
		window.open(resume, "_blank");
	};
	return (
		<div className="height-100">
			<Helmet>
				<title>Resume & CV | Arnold Adero - Senior Full Stack Engineer</title>
				<meta
					name="description"
					content="Download my up-to-date resume. Freelance Senior Full-Stack Engineer with a track record of delivering scalable web apps."
				/>
				<link rel="canonical" href="https://aderoportfolio.netlify.app/resume" />
			</Helmet>
			<div className="uk-text-center height-100">
				<div>
					<PrimaryButton
						iconProps={downloadIcon}
						onClick={() => onDownloadClick(user.resume)}
					>
						Download Resume
					</PrimaryButton>
				</div>
				{isClient && (
					<object
						data={user.resume}
						type="application/pdf"
						className="height-100 uk-width-1-1 uk-margin-small-top"
					>
						<p className="font-color-white">
							Sorry Couldn't load the file.
						</p>
					</object>
				)}
				{!isClient && (
					<p className="font-color-white uk-margin-small-top">
						Loading resume...
					</p>
				)}
			</div>
		</div>
	);
}

export default Resume;

