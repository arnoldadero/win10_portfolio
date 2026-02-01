import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../base/loadingSpinner";
import "./about.scss";

// Import all about sub-components
import AboutMe from "./aboutMe.about";
import Experience from "./experience.about";
import Education from "./education.about";
import Projects from "./projects.about";
import Skills from "./skills.about";
import Resume from "./resume.about";
import ContactMe from "./contactMe.about";
import Services from "./services.about";
import AIWorkflow from "./aiWorkflow.about";

/**
 * About Application - Unified Scrollable Container
 * Renders all About sections (Profile, Experience, Education, Projects, etc.)
 * in a single vertically-scrollable container with hardware acceleration.
 * 
 * Performance Features:
 * - Hardware-accelerated scrolling with transform3d
 * - CSS containment to prevent layout thrashing
 * - Smooth scroll behavior with proper touch handling
 * - Optimized for all mobile devices and screen sizes
 */
function AboutApplication() {
	return (
		<>
			<Helmet>
				<title>About Arnold Adero | AI-Augmented Full Stack Developer</title>
				<meta
					name="description"
					content="Senior AI-Augmented Full Stack Engineer and Project Manager with 10+ years experience. Expert in React, Node.js, and scaling systems using AI workflows."
				/>
				<link rel="canonical" href="https://arnoldadero.onrender.com/about" />
			</Helmet>

			<div className="about-application-container">
				{/* Main scrollable content area */}
				<div className="about-application-content">
					{/* Section 1: Profile & About Me */}
					<section className="about-section about-section--profile">
						<Suspense fallback={<LoadingSpinner />}>
							<AboutMe />
						</Suspense>
					</section>

					{/* Section 2: Experience */}
					<section className="about-section about-section--experience">
						<Suspense fallback={<LoadingSpinner />}>
							<Experience />
						</Suspense>
					</section>

					{/* Section 3: Education */}
					<section className="about-section about-section--education">
						<Suspense fallback={<LoadingSpinner />}>
							<Education />
						</Suspense>
					</section>

					{/* Section 4: Projects */}
					<section className="about-section about-section--projects">
						<Suspense fallback={<LoadingSpinner />}>
							<Projects />
						</Suspense>
					</section>

					{/* Section 5: Skills */}
					<section className="about-section about-section--skills">
						<Suspense fallback={<LoadingSpinner />}>
							<Skills />
						</Suspense>
					</section>

					{/* Section 6: Services */}
					<section className="about-section about-section--services">
						<Suspense fallback={<LoadingSpinner />}>
							<Services />
						</Suspense>
					</section>

					{/* Section 7: AI Workflow */}
					<section className="about-section about-section--ai-workflow">
						<Suspense fallback={<LoadingSpinner />}>
							<AIWorkflow />
						</Suspense>
					</section>

					{/* Section 8: Resume */}
					<section className="about-section about-section--resume">
						<Suspense fallback={<LoadingSpinner />}>
							<Resume />
						</Suspense>
					</section>

					{/* Section 9: Contact Me */}
					<section className="about-section about-section--contact">
						<Suspense fallback={<LoadingSpinner />}>
							<ContactMe />
						</Suspense>
					</section>
				</div>
			</div>
		</>
	);
}

export default AboutApplication;
