import React from "react";
import user from "../../../utils/data/user.config";

function Skills() {
	return (
		<div className="skills-app-container uk-padding">
			<div
				className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-1@s uk-grid-match"
				uk-grid={"true"}
			>
				{user.skills.map((skill, index) => {
					return (
						<div key={index}>
							<div className="premium-card">
								<h3 className="uk-card-title font-color-white uk-margin-small-bottom">
									{skill.name}
								</h3>
								<div className="uk-flex uk-flex-wrap" style={{ gap: "8px" }}>
									{skill.values.map((value, valIndex) => {
										return (
											<span
												className="uk-badge uk-padding-small uk-background-secondary"
												key={valIndex}
												style={{ fontSize: "12px", textTransform: "none" }}
											>
												{value}
											</span>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Skills;
