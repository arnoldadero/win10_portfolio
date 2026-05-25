import React from "react";
import { Helmet } from "react-helmet-async";
import "./about.scss";
import "./aiWorkflow.scss";
import antigravityIcon from "../../../assets/images/ai-workflow/antigravity.svg";
import hermesIcon from "../../../assets/images/ai-workflow/hermes.svg";
import githubIcon from "../../../assets/images/skills/github.svg";
import LazyImage from "../../base/lazyImage";

function AIWorkflow() {
	const tools = [
		{
			name: "Antigravity",
			tagline: "Autonomous Agent Platform",
			iconImg: antigravityIcon,
			color: "#3b82f6",
			frontStats: ["Multi-agent orchestration", "Context-aware code generation", "Automated code review & refactor"],
			backContent: "Antigravity agents handle entire feature cycles — from planning through implementation to review. I orchestrate parallel agents for complex refactors, test generation, and cross-file changes while I focus on architecture."
		},
		{
			name: "Hermes Agent",
			tagline: "CLI-First AI Engineer",
			iconImg: hermesIcon,
			color: "#8b5cf6",
			frontStats: ["Terminal-native workflow", "Context-rich sessions", "Skill-based knowledge system"],
			backContent: "Hermes is my daily driver for terminal-based development. It remembers project patterns across sessions via persistent skills and memory, runs autonomously on background tasks, and integrates directly with git and deployment pipelines."
		},
		{
			name: "GitHub Copilot",
			tagline: "AI Pair Programmer",
			iconImg: githubIcon,
			color: "#22c55e",
			frontStats: ["Autocomplete on steroids", "Test generation", "Docs & boilerplate"],
			backContent: "My daily driver for eliminating repetitive work. Generates tests, documentation, and boilerplate so I can focus on architecture. Combined with Antigravity and Hermes, I maintain an always-on AI development pipeline."
		}
	];

	const outcomes = [
		{ metric: "3x", label: "Feature Velocity" },
		{ metric: "60%", label: "Less Boilerplate" },
		{ metric: "24/7", label: "AI Development Pipeline" }
	];

	return (
		<div className="ai-workflow-section">
			<Helmet>
				<title>AI-Augmented Engineering | Arnold Adero</title>
				<meta
					name="description"
					content="How I use Antigravity, Hermes Agent, and GitHub Copilot to build software 3x faster."
				/>
				<link rel="canonical" href="https://arnoldadero.onrender.com/ai-workflow" />
			</Helmet>

			{/* Hero */}
			<div className="uk-text-center uk-margin-large-bottom">
				<h1 className="uk-heading-small">My AI Toolkit</h1>
				<p className="uk-text-lead">
					I run a multi-agent AI pipeline — not just autocomplete. Hover the cards to see how each layer works.
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
										<LazyImage
											src={tool.iconImg}
											alt={tool.name}
											style={{ width: '36px', height: '36px' }}
										/>
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
