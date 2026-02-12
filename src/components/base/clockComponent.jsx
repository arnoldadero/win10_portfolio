import React from "react";
import CustomClock from "./customClock";
import "./base.scss";

function ClockComponent() {
	return (
		<div
			className="uk-flex uk-flex-column taskbar-clock uk-text-center taskbar-icon uk-padding-small uk-padding-remove-vertical"
			uk-toggle="target: #calendar-expanded"
		>
			<div className="clock-timer">
				<CustomClock format={"h:mm A"} ticking={true} />
			</div>
			<div className="clock-timer">
				<CustomClock format={"DD-MM-YYYY"} />
			</div>
		</div>
	);
}

export default ClockComponent;
