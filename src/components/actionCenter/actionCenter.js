import { Icon } from "@fluentui/react";
import React from "react";
import { useSelector } from "react-redux";
import "./actionCenter.scss";
import { useDispatch } from "react-redux";
import { toggleSettings } from "../../utils/actions/settingsaction";
import { ACTION_TYPES } from "../../utils/documents/enums";
import JIOSaavn from "../applications/jiosaavn.application";

function ActionCenter() {
	const settings = useSelector((state) => state.settingsState);
	const dispatch = useDispatch();
	const handleSettingsClick = (type) => {
		dispatch(toggleSettings(type));
	};

	return (
		<div id="action-center" uk-offcanvas="overlay: false; flip:true">
			<div className="uk-offcanvas-bar action-center">
				<div className="action-center-header">
					<div className="action-center-title">Action Center</div>
				</div>
				<div className="action-center-content">
					<JIOSaavn />
				</div>
				<div className="action-center-footer">
					<div className="action-center-wrapper">
						{/* Wifi Button */}
						<div
							className={
								"uk-card uk-card-default action-center-btn" +
								(settings.wifiEnabled ? " settings-active" : "")
							}
							onClick={() =>
								handleSettingsClick(ACTION_TYPES.TOGGLE_WIFI)
							}
						>
							{settings.wifiEnabled && (
								<Icon
									iconName="WifiEthernet"
									className="action-center-icon"
								/>
							)}
							{!settings.wifiEnabled && (
								<Icon
									iconName="WifiWarning4"
									className="action-center-icon"
								/>
							)}

							<span className="action-center-label">
								Wifi
							</span>
						</div>

						{/* Mute Button */}
						<div
							className={
								"uk-card uk-card-default action-center-btn" +
								(settings.isMute ? " settings-active" : "")
							}
							onClick={() =>
								handleSettingsClick(ACTION_TYPES.TOGGLE_MUTE)
							}
						>
							{settings.isMute && (
								<Icon
									iconName="VolumeDisabled"
									className="action-center-icon"
								/>
							)}
							{!settings.isMute && (
								<Icon
									iconName="Volume3"
									className="action-center-icon"
								/>
							)}

							<span className="action-center-label">
								Sound
							</span>
						</div>

						{/* Airplane Mode */}
						<div
							className={
								"uk-card uk-card-default action-center-btn" +
								(settings.airplaneMode ? " settings-active" : "")
							}
							onClick={() =>
								handleSettingsClick(
									ACTION_TYPES.TOGGLE_AIRPLANE_MODE
								)
							}
						>
							{settings.airplaneMode && (
								<Icon
									iconName="Airplane"
									className="action-center-icon"
								/>
							)}
							{!settings.airplaneMode && (
								<Icon
									iconName="Airplane"
									className="action-center-icon"
								/>
							)}

							<span className="action-center-label">
								Airplane Mode
							</span>
						</div>

						{/* Settings */}
						<div className="uk-card uk-card-default action-center-btn">
							<Icon
								iconName="Settings"
								className="action-center-icon"
							/>

							<span className="action-center-label">
								Settings
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActionCenter;
