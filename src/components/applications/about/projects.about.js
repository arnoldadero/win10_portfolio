import React from "react";
import "./about.scss";
import user from "../../../utils/data/user.config";
import {
	DirectionalHint,
	IconButton,
	TooltipDelay,
	TooltipHost,
} from "@fluentui/react";

function Projects() {
	return (
		<div className="projects-app-container uk-padding">
			<div className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-1@s uk-grid-match" uk-grid="true">
				{user.projects.map((project, index) => {
					return (
						<article className="project-item" key={index}>
							<div className="premium-card project-card">
								<div className="uk-card-header uk-padding-remove-horizontal">
									<h3 className="uk-card-title font-color-white uk-margin-remove-bottom">
										{project.projectName}
										<TooltipHost
											content="View Project"
											delay={TooltipDelay.zero}
											directionalHint={DirectionalHint.bottomCenter}
										>
											<IconButton
												iconProps={{
													iconName: "NavigateExternalInline",
												}}
												className="link-to-project"
												target="_blank"
												href={project.link || "#"}
												onClick={() => window.open(project.link, "_blank")}
											/>
										</TooltipHost>
									</h3>
								</div>
								<div className="uk-card-body uk-padding-remove-horizontal uk-flex-1">
									<p className="uk-text-secondary">{project.description}</p>
								</div>
								<div className="uk-card-footer uk-padding-remove-horizontal">
									<div className="uk-flex uk-flex-wrap" style={{ gap: "8px" }}>
										{project.madeWith.map((stack, stackIndex) => {
											return (
												<span
													className="uk-badge uk-padding-small uk-background-secondary"
													key={stackIndex}
													style={{ fontSize: "11px", textTransform: "none" }}
												>
													{stack}
												</span>
											);
										})}
									</div>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
}

export default Projects;
