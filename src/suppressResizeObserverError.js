const resizeObserverErr = /ResizeObserver loop completed with undelivered notifications/;
const resizeObserverErrLegacy = /ResizeObserver loop limit exceeded/;

// Suppress console errors
const originalError = console.error;
console.error = (...args) => {
    const message = args[0]?.toString() || '';
    if (resizeObserverErr.test(message) || resizeObserverErrLegacy.test(message)) {
        return;
    }
    originalError.apply(console, args);
};

// Suppress global errors
window.addEventListener('error', (event) => {
    const message = event.message || event.error?.message || '';
    if (resizeObserverErr.test(message) || resizeObserverErrLegacy.test(message)) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
    }
}, { capture: true });

// Suppress unhandled rejections
window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || event.reason?.toString() || '';
    if (resizeObserverErr.test(message) || resizeObserverErrLegacy.test(message)) {
        event.preventDefault();
        return true;
    }
}, { capture: true });
