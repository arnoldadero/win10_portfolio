import React from "react";
import { Helmet } from "react-helmet-async";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import "./about.scss";

function Services() {
    const services = [
        {
            title: "Full-Stack Development",
            description: "End-to-end web application development using React, Node.js, and Laravel. From MVP to production-ready SaaS platforms.",
            highlights: ["React/Next.js frontend", "Node.js/Laravel backend", "Database design & optimization", "API development & integration"]
        },
        {
            title: "Legacy System Modernization",
            description: "Transform outdated codebases into modern, maintainable applications. Seamless migrations with zero downtime.",
            highlights: ["Code refactoring", "Framework migrations", "Performance optimization", "Documentation & training"]
        },
        {
            title: "Payment Integration",
            description: "Secure payment gateway implementation for African and global markets. M-Pesa, Stripe, PayPal expertise.",
            highlights: ["M-Pesa API integration", "Stripe/PayPal setup", "Webhook handling", "PCI compliance"]
        },
        {
            title: "DevOps & CI/CD",
            description: "Automated deployment pipelines and containerized infrastructure. Docker, Kubernetes, and cloud platform expertise.",
            highlights: ["Docker containerization", "GitLab CI/CD pipelines", "AWS/Azure deployment", "Monitoring & logging"]
        }
    ];

    const copyEmail = () => {
        navigator.clipboard.writeText("arnold@mvuvi.co.ke");
        alert("Email copied to clipboard!");
    };

    return (
        <div className="services-container uk-padding">
            <Helmet>
                <title>Hire Arnold Adero | Freelance Senior Full Stack Developer</title>
                <meta
                    name="description"
                    content="Available for freelance projects, consulting, and full-time remote positions. Specializing in React, Node.js, and payment integrations."
                />
                <link rel="canonical" href="https://aderoportfolio.netlify.app/services" />
            </Helmet>

            <div className="services-header uk-text-center uk-margin-large-bottom">
                <h1 className="uk-heading-small">Services & Availability</h1>
                <p className="uk-text-lead">Senior Full-Stack Engineer available for projects starting at $50/hour</p>
            </div>

            <div className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-1@s uk-grid-match" uk-grid="true">
                {services.map((service, index) => (
                    <div key={index}>
                        <div className="premium-card glassy-card uk-padding">
                            <h3 className="uk-card-title">{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="uk-list uk-list-bullet">
                                {service.highlights.map((highlight, idx) => (
                                    <li key={idx}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cta-section uk-margin-large-top uk-text-center">
                <div className="premium-card glassy-card uk-padding-large">
                    <h2>Ready to Start Your Project?</h2>
                    <p className="uk-text-large uk-margin-medium">
                        Let's discuss how I can help bring your ideas to life
                    </p>
                    <div className="uk-flex uk-flex-center uk-flex-wrap uk-margin-top" style={{ gap: "1rem" }}>
                        <PrimaryButton
                            text="Copy Email"
                            onClick={copyEmail}
                            iconProps={{ iconName: "Mail" }}
                        />
                        <DefaultButton
                            text="View LinkedIn"
                            onClick={() => window.open("https://www.linkedin.com/in/arnold-adero-49607955", "_blank")}
                            iconProps={{ iconName: "LinkedInLogo" }}
                        />
                        <DefaultButton
                            text="Upwork Profile"
                            onClick={() => window.open("https://www.upwork.com/freelancers/arnoldadero", "_blank")}
                            iconProps={{ iconName: "Work" }}
                        />
                    </div>
                    <p className="uk-margin-top uk-text-muted">
                        <strong>Email:</strong> arnold@mvuvi.co.ke | <strong>Based in:</strong> Nairobi, Kenya (EAT UTC+3)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Services;
