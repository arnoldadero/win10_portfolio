import React from "react";
import { useDispatch } from "react-redux";
import { handleApplicationClick } from "../../utils/actions/app.action";
import folder from "../../assets/images/baseImages/default_folder.png";
import LazyImage from "./lazyImage";

function AppIcon(props) {
	const dispatch = useDispatch();
	const handleIconClick = (app) => {
		dispatch(handleApplicationClick(app));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleIconClick(props.appInfo);
		}
	};

	return (
		<div
			className="app-icon"
			onClick={() => handleIconClick(props.appInfo)}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			aria-label={`Open ${props.appInfo.name}`}
			title={props.appInfo.name}
		>
			<div className="app-icon-image">
				<LazyImage
					src={
						props.appInfo.icon !== undefined &&
							props.appInfo.icon !== null &&
							props.appInfo.icon !== ""
							? props.appInfo.icon
							: folder
					}
					alt={props.appInfo.name}
					width="36"
					height="36"
				/>
			</div>
			<div className="app-icon-label">
				{props.appInfo.name}
			</div>
		</div>
	);
}

export default AppIcon;
