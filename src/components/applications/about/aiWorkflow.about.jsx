import React from "react";
import { Helmet } from "react-helmet-async";
import { FontIcon } from "@fluentui/react";
import "./about.scss";
import "./aiWorkflow.scss";

function AIWorkflow() {
	const tools = [
		{
			name: "Cursor",
			tagline: "AI-Native IDE",
			icon: "Code",
			color: "#7c3aed",
			frontStats: ["Full-project context", "Intelligent refactoring", "Natural language coding"],
			backContent: "Write features by describing intent. Cursor understands your entire codebase to deliver precise, context-aware implementations."
		},
		{
			name: "Lovable",
			tagline: "Rapid Prototyping",
			icon: "Design",
			color: "#ec4899",
			frontStats: ["UI in minutes", "Full-stack scaffolding", "Instant deployment"],
			backContent: "Go from idea to live prototype in under an hour. Perfect for validating concepts with stakeholders before committing to code."
		},
		{
			name: "GitHub Copilot",
			tagline: "AI Pair Programmer",
			icon: "GitGraph",
			color: "#22c55e",
			frontStats: ["Autocomplete on steroids", "Test generation", "Docs & boilerplate"],
			backContent: "My daily driver for eliminating repetitive work. Generates tests, documentation, and boilerplate so I can focus on architecture."
		}
	];

	const outcomes = [
		{ metric: "40%", label: "Faster Delivery" },
		{ metric: "2x", label: "Test Coverage" },
		{ metric: "60%", label: "Less Boilerplate" }
	];

	return (
		<div className="ai-workflow-container uk-padding">
			<Helmet>
				<title>AI-Augmented Engineering | Arnold Adero</title>
				<meta
					name="description"
					content="How I use Cursor, Lovable, and GitHub Copilot to build software faster."
				/>
				<link rel="canonical" href="https://arnoldadero.onrender.com/ai-workflow" />
			</Helmet>

			{/* Hero */}
			<div className="uk-text-center uk-margin-large-bottom">
				<h1 className="uk-heading-small">My AI Toolkit</h1>
				<p className="uk-text-lead">
					I use AI to ship faster, not cheaper. Hover the cards to see how.
				</p>
			</div>

			{/* Flip Cards */}
			<div className="uk-grid-medium uk-child-width-1-3@m uk-child-width-1-1@s" uk-grid="true">
				{tools.map((tool, index) => (
					<div key={index}>
						<div className="flip-card">
							<div className="flip-card-inner">
								{/* Front */}
								<div className="flip-card-front" style={{ '--card-accent': tool.color }}>
									<div className="card-icon-ring" style={{ borderColor: tool.color }}>
										<FontIcon iconName={tool.icon} style={{ fontSize: '32px', color: tool.color }} />
									</div>
									<h3 className="card-title">{tool.name}</h3>
									<span className="card-tagline">{tool.tagline}</span>
									<ul className="card-stats">
										{tool.frontStats.map((stat, i) => (
											<li key={i}><FontIcon iconName="CheckMark" style={{ color: tool.color, marginRight: '8px' }} />{stat}</li>
										))}
									</ul>
									<span className="flip-hint">Hover to learn more →</span>
								</div>
								{/* Back */}
								<div className="flip-card-back" style={{ '--card-accent': tool.color }}>
									<h3 className="card-title">How I Use It</h3>
									<p className="card-description">{tool.backContent}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Outcome Stats */}
			<div className="outcomes-section uk-margin-large-top">
				<h2 className="uk-text-center uk-h4">The Result</h2>
				<div className="outcomes-grid">
					{outcomes.map((item, index) => (
						<div key={index} className="outcome-item">
							<span className="outcome-metric">{item.metric}</span>
							<span className="outcome-label">{item.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default AIWorkflow;