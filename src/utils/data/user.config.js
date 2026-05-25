import ResumePDF from "./ARNOLD ADERO's Resume.pdf";
import user_avatar from "../../assets/images/baseImages/profile.webp";

const user = {
	firstName: "Arnold",
	lastName: "Adero",
	role: "Full-Stack Engineer & CEO @ Mvuvi Blue Connect",
	userImage: user_avatar,
	resume: ResumePDF,
	email: "arnold@mvuvi.co.ke",
	linkedIn: "in/arnold-adero-49607955",
	upwork: "arnoldadero",
	gitHub: "arnoldadero",
	whatsapp: "+254****3486",
	instagram: "mvuvi_ke",
	facebook: "mvuvi.co.ke",
	aboutMe: {
		intro: "I build real things for real industries — from seafood supply chains to web platforms. Clean, efficient code that solves problems that matter.",
		description:
			"I'm a self-taught engineer who started at Zone01 Kisumu (Go fundamentals) and built my way up to production full-stack systems. My work sits at the crossroads of sustainable industry, modern software, and African tech.\n\nAs CEO of Mvuvi Blue Connect, I built a full-stack fisheries platform from scratch — NestJS, Next.js, PostgreSQL — handling partner onboarding, role-based access, market listings, and real-time supply chain data for the Lake Victoria ecosystem.\n\nBeyond code, I run Mvuvi Industries — a seafood processing company exploring mycoremediation (turning fish waste into animal feed and fertilizer via oyster mushrooms). I also keep goats and fish in my spare time.",
		outro: "I believe the best software comes from understanding the problem domain deeply — not just the tech stack. That's why I build for industries I know firsthand: fishing, logistics, payments, and agriculture.",
	},
	experiences: [
		{
			organization: "Upwork (Remote)",
			organizationPicture: null,
			isCurrent: true,
			startDate: "2011",
			endDate: "Present",
			positions: [
				{
					positionName: "Full-Stack Developer & AI Systems Integrator",
					startDate: "2011",
					endDate: "Present",
					isPresent: true,
					description:
						"Built and maintained scalable full-stack solutions for international clients using React, Laravel, Node.js, and Docker. Pioneer in AI-augmented development, utilizing Cursor and GitHub Copilot to reduce bug rates and accelerate delivery timelines by 40%. Delivered SaaS, eCommerce, and CMS projects optimized for performance, security, and SEO. Automated deployment pipelines and containerized production environments. Integrated global payment systems (Stripe, PayPal) and regional gateways (M-Pesa).",
				},
			],
		},
		{
			organization: "Mvuvi Blue Connect / Mvuvi Industries",
			organizationPicture: null,
			isCurrent: true,
			startDate: "2023",
			endDate: "Present",
			positions: [
				{
					positionName: "CEO & Engineering Lead",
					startDate: "2023",
					endDate: "Present",
					isPresent: true,
					description:
						"Founded and built a full-stack fisheries platform connecting boat-to-market supply chains on Lake Victoria. Architected the entire system — NestJS API, Next.js dashboard, PostgreSQL with Prisma, role-based access for fishers, transporters, and buyers. Also runs Mvuvi Industries (seafood processing + mycoremediation research).",
				},
			],
		},
		{
			organization: "Axestore Online",
			organizationPicture: null,
			isCurrent: true,
			startDate: "2019",
			endDate: "Present",
			positions: [
				{
					positionName: "Owner",
					startDate: "2019",
					endDate: "Present",
					isPresent: true,
					description:
						"Founded and manage an eCommerce brand with end-to-end responsibility for development, SEO, and digital marketing.",
				},
			],
		},
		{
			organization: "GrowthBond.co",
			organizationPicture: null,
			isCurrent: false,
			startDate: "2018",
			endDate: "2020",
			positions: [
				{
					positionName: "Country Manager (Kenya)",
					startDate: "2018",
					endDate: "2020",
					isPresent: false,
					description:
						"Partnered with the International Trade Centre (ITC) to deliver social-media advertising training for refugees in Kakuma. Led curriculum design, stakeholder coordination, and mentorship programs for digital inclusion.",
				},
			],
		},
		{
			organization: "Weddings in Winnipeg",
			organizationPicture: null,
			isCurrent: false,
			startDate: "2012",
			endDate: "2016",
			positions: [
				{
					positionName: "Operations Manager",
					startDate: "2012",
					endDate: "2016",
					isPresent: false,
					description:
						"Oversaw operations and web management for a Canadian bridal media company, optimizing workflow efficiency and digital reach.",
				},
			],
		},
		{
			organization: "GiveDirectly",
			organizationPicture: null,
			isCurrent: false,
			startDate: "2011",
			endDate: "2011",
			positions: [
				{
					positionName: "Data Management & Research",
					startDate: "2011",
					endDate: "2011",
					isPresent: false,
					description:
						"Conducted data collection and analysis for Kenya's pioneering cash-transfer pilot project, ensuring accuracy and fairness in randomized distribution.",
				},
			],
		},
	],
	education: [
		{
			instituteName: "Zone 01 Kisumu",
			degree: "Software Engineering (Peer-to-Peer)",
			year: "2024",
			id: 1,
		},
		{
			instituteName: "University of Nairobi",
			degree: "BSc Applied Science, Chemical Engineering",
			year: "",
			id: 2,
		},
	],
	projects: [
		{
			projectName: "Mvuvi Blue Connect",
			description:
				"Full-stack fisheries platform for the Lake Victoria ecosystem — my flagship project as CEO. Handles partner onboarding, role-based access (fishers, transporters, buyers), market listings, and real-time supply chain data. Built from the ground up with NestJS, Next.js, TypeScript, PostgreSQL, and Prisma. Deployed on Render and Vercel.",
			madeWith: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
			link: "https://www.mvuvi.co.ke",
			image: null,
		},
		{
			projectName: "Sports Predictor",
			description:
				"Live sports analytics and prediction app combining real-time data ingestion with ML models. FastAPI backend with Next.js frontend, PostgreSQL for persistence. Predicts match outcomes using historical data and live feeds.",
			madeWith: ["FastAPI", "Next.js", "Python", "PostgreSQL"],
			link: "",
			image: null,
		},
		{
			projectName: "Queen of Peace NGO",
			description:
				"Digital platform supporting Queen of Peace NGO in Kenya — covers education, healthcare, peace building, sustainable agriculture, women empowerment, climate change, and services for disabled & vulnerable children.",
			madeWith: ["Next.js", "TypeScript", "Tailwind CSS"],
			link: "",
			image: null,
		},
		{
			projectName: "Cold Storage Traceability",
			description:
				"Award-winning logistics platform tracking fish from boat to market. Won regional hackathon against 40+ teams. Now deployed commercially processing 500+ daily transactions with IoT sensor integration. Reduced spoilage by 35%.",
			madeWith: ["React", "Node.js", "Docker", "IoT"],
			link: "",
			image: null,
		},
		{
			projectName: "M-Pesa Payment Gateway",
			description:
				"Production-ready M-Pesa integration powering 15+ e-commerce platforms. Processes $50K+ monthly with 99.8% uptime. Automated callback handling and real-time ledger updates cut reconciliation from 6 hours to 15 minutes.",
			madeWith: ["Laravel", "M-Pesa API", "PHP", "Redis"],
			link: "",
			image: null,
		},
		{
			projectName: "Go: go-reloaded",
			description:
				"CLI text modifier written in Go — converts hex/bin to decimal, fixes casing, punctuation, apostrophes, and a/an corrections. Fully tested with clean separation of concerns.",
			madeWith: ["Go"],
			link: "https://github.com/arnoldadero/go-reloaded",
			image: null,
		},
		{
			projectName: "Go: Statistical Calculator",
			description:
				"Command-line statistical tool computing mean, median, variance, and standard deviation from file input. Built with test-driven development in Go. Demo of systems-level thinking.",
			madeWith: ["Go"],
			link: "https://github.com/arnoldadero/statistical-calculator",
			image: null,
		},
		{
			projectName: "Enterprise DevOps Pipeline",
			description:
				"Architected CI/CD infrastructure for 8-person distributed team across 3 time zones. Cut deployment time from 45 min to 8 min. Reduced new dev onboarding from 2 days to 4 hours using VS Code Dev Containers. 60% team velocity increase.",
			madeWith: ["Docker", "GitLab CI/CD", "Kubernetes"],
			link: "",
			image: null,
		},
		{
			projectName: "120+ Client Projects Delivered",
			description:
				"100% Job Success on Upwork across 120+ projects spanning 15 countries. Top-Rated Plus (top 3% globally). Average 4.95/5 rating with 98% repeat business. Specialized in SaaS, payments, and legacy modernization.",
			madeWith: ["React", "Laravel", "Node.js", "AWS"],
			link: "",
			image: null,
		},
	],
	skills: [
		{
			name: "Backend & API",
			values: [
				"NestJS",
				"FastAPI",
				"Node.js",
				"Laravel",
				"Python",
				"PHP",
				"REST & GraphQL APIs",
			],
		},
		{
			name: "Frontend",
			values: [
				"Next.js",
				"React.js",
				"TypeScript",
				"JavaScript (ES6+)",
				"Tailwind CSS",
				"HTML5/CSS3",
			],
		},
		{
			name: "Database & Infrastructure",
			values: [
				"PostgreSQL",
				"MySQL",
				"MongoDB",
				"Prisma ORM",
				"Docker",
				"CI/CD Pipelines",
				"Vercel",
				"Render",
			],
		},
		{
			name: "Languages & Tools",
			values: [
				"TypeScript",
				"Python",
				"Go",
				"PHP",
				"Git/GitHub",
				"Stripe & PayPal",
				"M-Pesa Integration",
			],
		},
	],
};

export default user;
