import React from "react";
import { Helmet } from "react-helmet-async";
import { PrimaryButton, DefaultButton, FontIcon } from "@fluentui/react";
import user from "../../../utils/data/user.config";
import "./about.scss";
import "./services.scss";
import "./aiWorkflow.scss";

function Services() {
    const services = [
        {
            icon: "Rocket",
            title: "Full-Stack Dev",
            tagline: "AI-Accelerated",
            color: "#7c3aed",
            frontStats: ["React / Next.js", "Node.js / Laravel", "REST & GraphQL APIs"],
            backContent: "End-to-end web applications built with AI-augmented workflows. From MVP to scale, I deliver production-grade systems 40% faster."
        },
        {
            icon: "Repair",
            title: "Legacy Rescue",
            tagline: "Modernization",
            color: "#f59e0b",
            frontStats: ["PHP → Modern Stack", "Zero-downtime migration", "Performance boost"],
            backContent: "Breathing new life into aging codebases. I refactor, migrate, and optimize legacy systems without disrupting your business."
        },
        {
            icon: "Money",
            title: "Payments",
            tagline: "Africa & Global",
            color: "#22c55e",
            frontStats: ["M-Pesa Integration", "Stripe & PayPal", "PCI Compliant"],
            backContent: "Secure payment processing for African and global markets. I've processed $50K+ monthly through custom M-Pesa gateways."
        },
        {
            icon: "CloudWeather",
            title: "DevOps",
            tagline: "CI/CD Pipelines",
            color: "#0ea5e9",
            frontStats: ["Docker & Kubernetes", "GitLab CI/CD", "AWS / Azure"],
            backContent: "Automated deployments that let you sleep at night. I reduce deploy times from 45 minutes to under 10 with zero-downtime releases."
        }
    ];

    const stats = [
        { metric: "120+", label: "Projects Delivered" },
        { metric: "100%", label: "Job Success (Upwork)" },
        { metric: "10+", label: "Years Experience" }
    ];

    const openWhatsApp = () => {
        window.open(`https://wa.me/${user.whatsapp.replace("+", "")}`, "_blank");
    };

    return (
        <div className="services-container uk-padding">
            <Helmet>
                <title>AI-Augmented Web Development Services | Arnold Adero Portfolio</title>
                <meta
                    name="description"
                    content="Experience rapid, high-quality development with AI-augmented workflows. Services include full-stack React/Node.js, legacy modernization, and M-Pesa integrations."
                />
                <link rel="canonical" href="https://arnoldadero.onrender.com/services" />
            </Helmet>

            {/* Hero */}
            <div className="services-header uk-text-center uk-margin-large-bottom">
                <h1 className="uk-heading-small">What I Build</h1>
                <p className="uk-text-lead">
                    Hover the cards to see how I can help your business.
                </p>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar uk-margin-medium-bottom">
                {stats.map((item, index) => (
                    <div key={index} className="stat-item">
                        <span className="stat-metric">{item.metric}</span>
                        <span className="stat-label">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Flip Cards Grid */}
            <div className="uk-grid-medium uk-child-width-1-2@m uk-child-width-1-1@s" uk-grid="true">
                {services.map((service, index) => (
                    <div key={index}>
                        <div className="flip-card service-flip">
                            <div className="flip-card-inner">
                                {/* Front */}
                                <div className="flip-card-front" style={{ '--card-accent': service.color }}>
                                    <div className="card-icon-ring" style={{ borderColor: service.color }}>
                                        <FontIcon iconName={service.icon} style={{ fontSize: '28px', color: service.color }} />
                                    </div>
                                    <h3 className="card-title">{service.title}</h3>
                                    <span className="card-tagline">{service.tagline}</span>
                                    <ul className="card-stats">
                                        {service.frontStats.map((stat, i) => (
                                            <li key={i}><FontIcon iconName="CheckMark" style={{ color: service.color, marginRight: '8px' }} />{stat}</li>
                                        ))}
                                    </ul>
                                    <span className="flip-hint">Hover for details →</span>
                                </div>
                                {/* Back */}
                                <div className="flip-card-back" style={{ '--card-accent': service.color }}>
                                    <h3 className="card-title">How It Works</h3>
                                    <p className="card-description">{service.backContent}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="cta-section uk-margin-large-top uk-text-center">
                <div className="cta-card-simple">
                    <h2>Let's Talk</h2>
                    <p>Ready to start? I typically respond within 24 hours.</p>
                    <div className="cta-buttons">
                        <PrimaryButton
                            text="WhatsApp"
                            onClick={openWhatsApp}
                            iconProps={{ iconName: "Chat" }}
                            className="cta-button-primary"
                        />
                        <DefaultButton
                            text="LinkedIn"
                            onClick={() => window.open(`https://www.linkedin.com/${user.linkedIn}`, "_blank")}
                            iconProps={{ iconName: "LinkedInLogo" }}
                        />
                        <DefaultButton
                            text="Upwork"
                            onClick={() => window.open(`https://www.upwork.com/freelancers/${user.upwork}`, "_blank")}
                            iconProps={{ iconName: "Work" }}
                        />
                    </div>
                    <p className="cta-location">📍 Nairobi, Kenya (UTC+3)</p>
                </div>
            </div>
        </div>
    );
}

export default Services;
