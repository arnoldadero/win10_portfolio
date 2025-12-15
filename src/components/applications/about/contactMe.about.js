import React from "react";
import SocialBlock from "../../base/socialBlock";
import Mail from "../mail.application";

import { Helmet } from "react-helmet-async";

function ContactMe() {
	return (
		<div className="uk-width-1-1">
			<Helmet>
				<title>Contact Arnold Adero | Hire Senior React Developer</title>
				<meta
					name="description"
					content="Get in touch for freelance software development, consulting, or job opportunities. Email: arnold@mvuvi.co.ke"
				/>
				<link rel="canonical" href="https://aderoportfolio.netlify.app/contact" />
			</Helmet>
			<div className="uk-text-center">
				<p>Find me on : </p>
				<SocialBlock />
			</div>
			<div className="premium-card uk-margin-top">
				<Mail />
			</div>
		</div>
	);
}

export default ContactMe;
