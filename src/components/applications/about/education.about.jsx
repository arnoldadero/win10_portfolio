import React from "react";
import user from "../../../utils/data/user.config";

function Education() {
	return (
		<div className="education-section">
			<div className="timeline-wrapper">
				{user.education.map((education, index) => {
					return (
						<article className="timeline-item" key={index}>
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<h4 className="institute-name">
									{education.instituteName}
								</h4>
								<span className="education-year">{education.year}</span>
								<h5 className="degree-name">
									{education.degree}
								</h5>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
}

export default Education;
