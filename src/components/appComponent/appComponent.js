import { IconButton, TextField } from "@fluentui/react";
import React, { useState, useRef, Suspense, useEffect } from "react";
import "./appComponent.scss";
import { useDispatch } from "react-redux";
import { handleAppFunctions } from "../../utils/actions/app.action";
import WindowFrame from "../windowFrame/windowFrame";
import AppRegistry from "../base/AppRegistry";
import useAutoScroll from "../../hooks/useAutoScroll";

class AppErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="uk-padding-small">
					<div className="uk-text-bold">This app failed to load.</div>
					<div className="uk-text-small uk-margin-small-top">
						If this only happens on the deployed site, it’s usually a missing/blocked chunk or an embedded site refusing to load in an iframe.
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

function AppComponent(props) {
	const dispatch = useDispatch();
	const handleAppFunctionClick = (app, type) => {
		dispatch(handleAppFunctions(app, type));
	};

	const [showAppMenu, setShowAppMenu] = useState(false);
	const [currentComponentName, setCurrentComponentName] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const sidebarRef = useRef(null);
	const scrollContainerRef = useRef(null);
	const contentContainerRef = useRef(null);
	const scrollRafRef = useRef(null);

	// Initialize auto-scroll hook for About app on mobile
	const autoScrollConfig = useAutoScroll(
		contentContainerRef,
		props.appInfo.subComponent || [],
		{
			enabled: props.appInfo.id === "aboutMe",
			mobileBreakpoint: 768,
			scrollDelay: 5000, // 5 seconds between auto-scrolls
			scrollDuration: 1000, // 1 second smooth scroll
			axis: "y",
			pauseOnHover: true,
			pauseOnScroll: true,
		}
	);

	const setComponent = (componentName, index) => {
		setCurrentComponentName(componentName);
		if (index !== undefined) {
			setCurrentIndex(index);
		}
	};

	useEffect(() => {
		if (props.appInfo.subComponent?.length && !currentComponentName) {
			setComponent(props.appInfo.subComponent[0].name, 0);
		}
	}, [props.appInfo.subComponent, currentComponentName]);

	const navigateBack = () => {
		if (currentIndex > 0 && props.appInfo.subComponent) {
			const newIndex = currentIndex - 1;
			setCurrentIndex(newIndex);
			setCurrentComponentName(props.appInfo.subComponent[newIndex].name);
			
			// Update auto-scroll position
			if (autoScrollConfig.isMobile) {
				autoScrollConfig.scrollToSection(newIndex);
			}
			
			// Trigger UIkit switcher
			if (sidebarRef.current) {
				const items = sidebarRef.current.querySelectorAll('li > button');
				if (items[newIndex]) {
					items[newIndex].click();
				}
			}
		}
	};

	// Sync with Redux state for Deep Linking
	useEffect(() => {
		if (
			props.appInfo.activeSubComponentIndex !== undefined &&
			props.appInfo.activeSubComponentIndex !== currentIndex &&
			props.appInfo.subComponent
		) {
			const newIndex = props.appInfo.activeSubComponentIndex;
			if (props.appInfo.subComponent[newIndex]) {
				setComponent(props.appInfo.subComponent[newIndex].name, newIndex);
				
				// Update auto-scroll position
				if (autoScrollConfig.isMobile) {
					autoScrollConfig.scrollToSection(newIndex);
				}
				
				// Trigger UIkit switcher
				if (sidebarRef.current) {
					const items = sidebarRef.current.querySelectorAll("li > button");
					if (items[newIndex]) {
						items[newIndex].click();
					}
				}
			}
		}
	}, [props.appInfo.activeSubComponentIndex, props.appInfo.subComponent, currentIndex, autoScrollConfig.isMobile]);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		const listContainer = contentContainerRef.current;
		if (!scrollContainer || !listContainer || props.appInfo.id !== "aboutMe" || !autoScrollConfig.isMobile) {
			return undefined;
		}

		const handleScroll = () => {
			if (scrollRafRef.current) {
				return;
			}

			scrollRafRef.current = requestAnimationFrame(() => {
				const containerHeight = scrollContainer.clientHeight;
				const scrollMidpoint = scrollContainer.scrollTop + containerHeight / 2;
				const containerTop = scrollContainer.getBoundingClientRect().top;
				const children = Array.from(listContainer.children);
				let activeIndex = currentIndex;

				children.forEach((child, index) => {
					const rect = child.getBoundingClientRect();
					const start = rect.top - containerTop + scrollContainer.scrollTop;
					const end = start + rect.height;
					if (scrollMidpoint >= start && scrollMidpoint < end) {
						activeIndex = index;
					}
				});

				if (activeIndex !== currentIndex && props.appInfo.subComponent?.[activeIndex]) {
					setComponent(props.appInfo.subComponent[activeIndex].name, activeIndex);
				}

				scrollRafRef.current = null;
			});
		};

		scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			scrollContainer.removeEventListener("scroll", handleScroll);
			if (scrollRafRef.current) {
				cancelAnimationFrame(scrollRafRef.current);
				scrollRafRef.current = null;
			}
		};
	}, [props.appInfo.id, props.appInfo.subComponent, autoScrollConfig.isMobile, currentIndex]);

	const navigateForward = () => {
		if (props.appInfo.subComponent && currentIndex < props.appInfo.subComponent.length - 1) {
			const newIndex = currentIndex + 1;
			setCurrentIndex(newIndex);
			setCurrentComponentName(props.appInfo.subComponent[newIndex].name);
			
			// Update auto-scroll position
			if (autoScrollConfig.isMobile) {
				autoScrollConfig.scrollToSection(newIndex);
			}
			
			// Trigger UIkit switcher
			if (sidebarRef.current) {
				const items = sidebarRef.current.querySelectorAll('li > button');
				if (items[newIndex]) {
					items[newIndex].click();
				}
			}
		}
	};

	return (
		<WindowFrame
			appInfo={props.appInfo}
			onFunctionClick={handleAppFunctionClick}
		>
			<div className="uk-flex uk-flex-row uk-height-1-1 uk-width-1-1">
				{props.appInfo.showLinks && (
					<div
						className={
							"app-sidebar blur uk-hidden@xs uk-visible@m " +
							(props.appInfo.isApplication ? "isApplication" : "")
						}
					>
						<ul
							className="uk-list sidebar-list uk-margin-large-top"
							uk-switcher={"connect: ." + props.appInfo.id}
							ref={sidebarRef}
						>
							{props.appInfo.subComponent && props.appInfo.subComponent.map(
								(component, index) => {
									return (
										<li
											className="uk-margin-remove"
											key={index}
										>
											<button
												type="button"
												onClick={() => {
													setComponent(component.name, index);
													// Update auto-scroll position on mobile
													if (autoScrollConfig.isMobile) {
														autoScrollConfig.scrollToSection(index);
													}
												}}
											>
												<span className="sidebar-list-item uk-margin-remove">
													{component.name}
												</span>
											</button>
										</li>
									);
								}
							)}
						</ul>
					</div>
				)}
				<div
					className={
						"uk-width-expand@s " +
						((props.appInfo.isApplication &&
							props.appInfo.isMaximized) ||
							props.appInfo.isApplication
							? "maximized-application"
							: "app-content-container")
					}
				>
					{/* Title bar is now handled by WindowFrame */}

					<div
					className={`app-content uk-background-secondary scrollbar ${props.appInfo.id}`}
					ref={scrollContainerRef}
				>
						{!props.appInfo.isApplication && (
							<div className="app-nav-bar uk-padding-small uk-flex">
								<IconButton
									iconProps={{ iconName: "Back" }}
									title="Back"
									ariaLabel="Back"
									onClick={navigateBack}
									disabled={currentIndex === 0}
								/>
								<IconButton
									iconProps={{ iconName: "Forward" }}
									title="Forward"
									ariaLabel="Forward"
									onClick={navigateForward}
									disabled={currentIndex === (props.appInfo.subComponent ? props.appInfo.subComponent.length - 1 : 0)}
								/>
								<TextField
									disabled
									iconProps={{ iconName: "Refresh" }}
									className="app-path-field uk-margin-small-right disabled-text-field uk-width-3-5"
									placeholder={`This PC > ${props.appInfo.name} > ${currentComponentName}`}
								/>
								<TextField
									disabled
									iconProps={{ iconName: "Search" }}
									className="uk-margin-small-right disabled-text-field uk-width-1-5"
									placeholder={`Search`}
								/>
							</div>
						)}
						<div className="dropdown">
							<IconButton
								iconProps={{
									iconName: "GlobalNavButton",
								}}
								title="Menu"
								ariaLabel="Menu"
								className="uk-hidden@m"
								onClick={() => setShowAppMenu(!showAppMenu)}
							/>
							<div
								className={
									"dropdown-content blur uk-box-shadow-large " +
									(showAppMenu
										? "show-element"
										: "hide-element")
								}
							>
								<ul
									className="uk-list sidebar-list"
									uk-switcher={
										"connect: ." + props.appInfo.id
									}
								>
									{props.appInfo.subComponent && props.appInfo.subComponent.map(
										(component, index) => {
											return (
												<li
													className="uk-margin-remove"
													onClick={() =>
														setShowAppMenu(
															!showAppMenu
														)
													}
													key={index}
												>
													<button
														type="button"
														onClick={() => {
															setComponent(
																component.name,
																index
															);
															// Update auto-scroll position on mobile
															if (autoScrollConfig.isMobile) {
																autoScrollConfig.scrollToSection(index);
															}
														}}
													>
														<span className="sidebar-list-item uk-margin-remove">
															{component.name}
														</span>
													</button>
												</li>
											);
										}
									)}
								</ul>
							</div>
						</div>

						<ul
							className={
								"uk-switcher height-100 " +
								props.appInfo.id +
								(props.appInfo.isApplication
									? " isApplication-list"
									: "")
							}
							ref={contentContainerRef}
						>
							{props.appInfo.subComponent && props.appInfo.subComponent.map(
								(component, index) => {
									return (
										<li
											className="uk-padding-small height-100"
											data-section-name={component.name}
											data-section-index={index}
											key={index}
										>
											<React.Fragment>
												<AppErrorBoundary key={component.component}>
													<Suspense fallback={<div className="uk-position-center">Loading...</div>}>
														{AppRegistry[component.component] ? (
															React.createElement(AppRegistry[component.component])
														) : (
															<div>Component not found</div>
														)}
													</Suspense>
												</AppErrorBoundary>
											</React.Fragment>
										</li>
									);
								}
							)}
						</ul>
					</div>
				</div>
			</div>
		</WindowFrame>
	);
}

export default AppComponent;
