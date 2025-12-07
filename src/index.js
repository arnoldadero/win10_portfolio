import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./theme/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as serviceWorker from "./serviceWorker";
import "react-resizable/css/styles.css";
import { Provider } from "react-redux";
import store from "./utils/store";

// Suppress benign ResizeObserver error BEFORE any other code
const resizeObserverLoopErr = /ResizeObserver loop completed with undelivered notifications/;

// Suppress at console level
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
	if (args[0] && resizeObserverLoopErr.test(args[0])) {
		return;
	}
	originalError.call(console, ...args);
};

console.warn = (...args) => {
	if (args[0] && resizeObserverLoopErr.test(args[0])) {
		return;
	}
	originalWarn.call(console, ...args);
};

// Suppress at event level (capture phase)
window.addEventListener('error', (e) => {
	if (resizeObserverLoopErr.test(e.message) || resizeObserverLoopErr.test(e.filename)) {
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		return false;
	}
}, true);

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
	if (resizeObserverLoopErr.test(e.reason?.message || e.reason)) {
		e.preventDefault();
	}
});

// Override global error handler
const originalOnError = window.onerror;
window.onerror = function (message, source, lineno, colno, error) {
	if (resizeObserverLoopErr.test(message) || resizeObserverLoopErr.test(source)) {
		return true;
	}
	if (typeof originalOnError === 'function') {
		return originalOnError.apply(this, arguments);
	}
	return false;
};

initializeIcons();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

serviceWorker.unregister();
reportWebVitals();
