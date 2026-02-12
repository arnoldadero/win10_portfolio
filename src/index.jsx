import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// IMPORT ERROR SUPPRESSION FIRST - before any UI libraries
import "./suppressResizeObserverError";

import "./index.scss";
import "./theme/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
// Moved uikit JS to lazy-loaded containers to reduce main bundle title
import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as serviceWorker from "./serviceWorker";
import "react-resizable/css/styles.css";
import { Provider } from "react-redux";
import store from "./utils/store";


import { BrowserRouter } from "react-router-dom";
import { initGA } from "./analytics/ga";

// Initialize icons early to avoid registration warnings
initializeIcons();

// Defer non-critical initializations
const lazyInit = () => {
	initGA();
};

if (window.requestIdleCallback) {
	window.requestIdleCallback(lazyInit);
} else {
	setTimeout(lazyInit, 2000);
}

const container = document.getElementById("root");
const app = (
	<Provider store={store}>
		<HelmetProvider>
			<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</Provider>
);

if (container.hasChildNodes()) {
	hydrateRoot(container, app);
} else {
	const root = createRoot(container);
	root.render(app);
}

serviceWorker.unregister();
reportWebVitals();
