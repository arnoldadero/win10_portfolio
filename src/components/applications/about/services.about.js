import React from "react";
import { Helmet } from "react-helmet-async";
import { PrimaryButton, DefaultButton, FontIcon } from "@fluentui/react";
import user from "../../../utils/data/user.config";
import "./about.scss";
import "./services.scss";

function Services() {
    const services = [
        {
            icon: "Rocket",
            title: "Full-Stack Development",
            benefit: "Launch faster with a scalable, production-ready web application.",
            description: "End-to-end web application development using React, Node.js, and Laravel. From MVP to production-ready SaaS platforms.",
            highlights: ["React/Next.js frontend", "Node.js/Laravel backend", "Database design & optimization", "API development & integration"]
        },
        {
            icon: "Refresh",
            title: "Legacy System Modernization",
            benefit: "Transform outdated codebases into maintainable assets with zero downtime.",
            description: "Transform outdated codebases into modern, maintainable applications. Seamless migrations with zero downtime.",
            highlights: ["Code refactoring", "Framework migrations", "Performance optimization", "Documentation & training"]
        },
        {
            icon: "Money",
            title: "Payment Integration",
            benefit: "Expand your market with secure, global payment processing.",
            description: "Secure payment gateway implementation for African and global markets. M-Pesa, Stripe, PayPal expertise.",
            highlights: ["M-Pesa API integration", "Stripe/PayPal setup", "Webhook handling", "PCI compliance"]
        },
        {
            icon: "CloudWeather",
            title: "DevOps & CI/CD",
            benefit: "Sleep soundly with automated deployments and stable infrastructure.",
            description: "Automated deployment pipelines and containerized infrastructure. Docker, Kubernetes, and cloud platform expertise.",
            highlights: ["Docker containerization", "GitLab CI/CD pipelines", "AWS/Azure deployment", "Monitoring & logging"]
        }
    ];

    const openWhatsApp = () => {
        window.open(`https://wa.me/${user.whatsapp.replace("+", "")}`, "_blank");
    };

    return (
        <div className="services-container uk-padding">
            <Helmet>
                <title>Hire Arnold Adero | Freelance Senior Full Stack Developer</title>
                <meta
                    name="description"
                    content="Available for freelance projects, consulting, and full-time remote positions. Specializing in React, Node.js, and payment integrations."
                />
                <link rel="canonical" href="https://arnoldadero.onrender.com/services" />
            </Helmet>

            <div className="services-header uk-text-center uk-margin-large-bottom">
                <h1 className="uk-heading-small">Build Reliable, Scalable Web Products — Fast</h1>
                <p className="uk-text-lead uk-margin-small-top">
                    Senior Full-Stack Engineer helping startups & businesses ship production-ready systems with confidence.
                </p>
                <div className="uk-flex uk-flex-center uk-margin-top">
                    <div className="trust-badge">
                        <FontIcon iconName="CheckMark" className="check-icon" /> 10+ Years Experience
                    </div>
                    <div className="trust-badge">
                        <FontIcon iconName="CheckMark" className="check-icon" /> African + Global Payment Expertise
                    </div>
                    <div className="trust-badge">
                        <FontIcon iconName="CheckMark" className="check-icon" /> Production-Grade Systems
                    </div>
                </div>
            </div>

            <div className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-1@s uk-grid-match" uk-grid="true">
                {services.map((service, index) => (
                    <div key={index}>
                        <div className="premium-card glassy-card uk-padding">
                            <div className="card-header-flex">
                                <div className="service-icon-wrapper">
                                    <FontIcon iconName={service.icon} className="service-icon" />
                                </div>
                                <div className="service-title-wrapper">
                                    <h3 className="uk-card-title">{service.title}</h3>
                                    <p className="service-benefit">{service.benefit}</p>
                                </div>
                            </div>
                            
                            <p className="service-description">{service.description}</p>
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
                <div className="premium-card glassy-card uk-padding-large cta-card">
                    <h2>Ready to Start Your Project?</h2>
                    <p className="uk-text-large uk-margin-medium">
                        Let's discuss how I can help bring your ideas to life
                    </p>
                    <div className="uk-flex uk-flex-center uk-flex-wrap uk-margin-top" style={{ gap: "1rem" }}>
                        <PrimaryButton
                            text="Chat on WhatsApp"
                            onClick={openWhatsApp}
                            iconProps={{ iconName: "Chat" }}
                            aria-label="Chat with Arnold on WhatsApp"
                            className="cta-button-primary"
                        />
                        <DefaultButton
                            text="View LinkedIn"
                            onClick={() => window.open(`https://www.linkedin.com/${user.linkedIn}`, "_blank")}
                            iconProps={{ iconName: "LinkedInLogo" }}
                            aria-label="View Arnold's LinkedIn Profile"
                        />
                        <DefaultButton
                            text="Upwork Profile"
                            onClick={() => window.open(`https://www.upwork.com/freelancers/${user.upwork}`, "_blank")}
                            iconProps={{ iconName: "Work" }}
                            aria-label="View Arnold's Upwork Profile"
                        />
                    </div>
                    <p className="uk-margin-top uk-text-muted uk-text-small">
                        Typically responds within 24 hours • No obligation call
                    </p>
                    <p className="uk-text-muted uk-text-small">
                         <strong>Based in:</strong> Nairobi, Kenya (EAT UTC+3)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Services;
