import React, { useMemo, useState } from "react";
import './chrome.application.scss';

const DEFAULT_HOME_URL = "https://www.google.com/webhp?igu=1";

const LIKELY_FRAME_BLOCKED_HOSTS = new Set([
	"instagram.com",
	"www.instagram.com",
	"facebook.com",
	"www.facebook.com",
	"accounts.google.com",
	"x.com",
	"www.x.com",
	"twitter.com",
	"www.twitter.com",
]);

function getHostnameSafe(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return "";
	}
}

function isLikelyFrameBlocked(url) {
	const host = getHostnameSafe(url);
	if (!host) return false;
	return LIKELY_FRAME_BLOCKED_HOSTS.has(host);
}

function normalizeInputToUrl(input) {
	const raw = (input ?? "").trim();
	if (!raw) return DEFAULT_HOME_URL;

	const looksLikeUrl = /\./.test(raw) || raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("localhost") || /^\d{1,3}(?:\.\d{1,3}){3}/.test(raw);
	if (!looksLikeUrl || /\s/.test(raw)) {
		return `https://www.google.com/search?q=${encodeURIComponent(raw)}`;
	}

	if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
	return `https://${raw}`;
}

function createTab(initialInput = DEFAULT_HOME_URL) {
	const initialUrl = normalizeInputToUrl(initialInput);
	return {
		id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		history: [initialUrl],
		index: 0,
		addressValue: initialUrl,
		reloadKey: 0,
	};
}

function Chrome() {
	const [tabs, setTabs] = useState(() => [createTab(DEFAULT_HOME_URL)]);
	const [activeTabId, setActiveTabId] = useState(() => tabs[0].id);

	const activeTabIndex = useMemo(() => tabs.findIndex((t) => t.id === activeTabId), [tabs, activeTabId]);
	const activeTab = tabs[Math.max(activeTabIndex, 0)];
	const currentUrl = activeTab?.history?.[activeTab?.index] ?? DEFAULT_HOME_URL;
	const showFrameBlockedNotice = useMemo(() => isLikelyFrameBlocked(currentUrl), [currentUrl]);
	const canGoBack = !!activeTab && activeTab.index > 0;
	const canGoForward = !!activeTab && activeTab.index < activeTab.history.length - 1;

	const openExternally = () => {
		if (!currentUrl) return;
		window.open(currentUrl, "_blank", "noopener,noreferrer");
	};

	const copyCurrentUrl = async () => {
		if (!currentUrl) return;
		try {
			await navigator.clipboard.writeText(currentUrl);
		} catch {
			// ignore
		}
	};

	const setActiveTab = (updater) => {
		setTabs((prevTabs) => {
			const idx = prevTabs.findIndex((t) => t.id === activeTabId);
			if (idx < 0) return prevTabs;
			const nextTabs = [...prevTabs];
			nextTabs[idx] = updater(nextTabs[idx]);
			return nextTabs;
		});
	};

	const onURLChange = (event) => {
		const nextValue = event.target.value;
		setActiveTab((t) => ({ ...t, addressValue: nextValue }));
	};

	const onGO = () => {
		if (!activeTab) return;
		const nextUrl = normalizeInputToUrl(activeTab.addressValue);
		setActiveTab((t) => {
			const base = t.history.slice(0, t.index + 1);
			return {
				...t,
				history: [...base, nextUrl],
				index: base.length,
				addressValue: nextUrl,
			};
		});
	};

	const goBack = () => {
		if (!canGoBack) return;
		setActiveTab((t) => {
			const nextIndex = Math.max(0, t.index - 1);
			const nextUrl = t.history[nextIndex] ?? DEFAULT_HOME_URL;
			return { ...t, index: nextIndex, addressValue: nextUrl };
		});
	};

	const goForward = () => {
		if (!canGoForward) return;
		setActiveTab((t) => {
			const nextIndex = Math.min(t.history.length - 1, t.index + 1);
			const nextUrl = t.history[nextIndex] ?? DEFAULT_HOME_URL;
			return { ...t, index: nextIndex, addressValue: nextUrl };
		});
	};

	const reload = () => {
		if (!activeTab) return;
		setActiveTab((t) => ({ ...t, reloadKey: (t.reloadKey ?? 0) + 1 }));
	};

	const addTab = () => {
		const newTab = createTab(DEFAULT_HOME_URL);
		setTabs((prev) => [...prev, newTab]);
		setActiveTabId(newTab.id);
	};

	const closeTab = (tabId) => {
		setTabs((prev) => {
			if (prev.length <= 1) return prev;
			const idx = prev.findIndex((t) => t.id === tabId);
			const next = prev.filter((t) => t.id !== tabId);
			if (tabId === activeTabId) {
				const nextActive = next[Math.max(0, idx - 1)] ?? next[0];
				setActiveTabId(nextActive.id);
			}
			return next;
		});
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			onGO();
		}
	};

	return (
		<div className="chrome-app-container">
			<div className="chrome-tab-strip">
				{tabs.map((t, idx) => {
					const isActive = t.id === activeTabId;
					const label = `Tab ${idx + 1}`;
					return (
						<div
							key={t.id}
							className={`chrome-tab-item ${isActive ? 'active' : ''}`}
							role="button"
							tabIndex={0}
							onClick={() => setActiveTabId(t.id)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') setActiveTabId(t.id);
							}}
							title={label}
						>
							<span className="chrome-tab-title">{label}</span>
							<button
								type="button"
								className="chrome-tab-close"
								onClick={(e) => {
									e.stopPropagation();
									closeTab(t.id);
								}}
								title="Close"
							>
								×
							</button>
						</div>
					);
				})}
				<button type="button" className="chrome-tab-add" title="New tab" onClick={addTab}>+</button>
			</div>
			{/* Browser Chrome */}
			<div className="chrome-browser-bar">
				<button className="chrome-nav-btn chrome-back" title="Back" onClick={goBack} disabled={!canGoBack}>◀</button>
				<button className="chrome-nav-btn chrome-forward" title="Forward" onClick={goForward} disabled={!canGoForward}>▶</button>
				<button className="chrome-nav-btn chrome-reload" title="Reload" onClick={reload}>↻</button>
				<input
					type="text"
					className="chrome-address-bar"
					placeholder="Type a URL"
					value={activeTab?.addressValue ?? ''}
					onChange={onURLChange}
					onKeyDown={handleKeyDown}
				/>
				<button className="chrome-nav-btn" title="Go" onClick={onGO}>➜</button>
				<button className="chrome-menu-btn" title="Menu">⋯</button>
			</div>

			{/* Web Content */}
			<div className="chrome-content" style={{ padding: 0, overflow: 'hidden' }}>
				{showFrameBlockedNotice ? (
					<div className="chrome-frame-blocked">
						<div className="chrome-frame-blocked-card">
							<div className="chrome-frame-blocked-title">This site can’t be opened inside the app</div>
							<div className="chrome-frame-blocked-body">
								Some websites (like Instagram) block being displayed in an embedded frame (X-Frame-Options / CSP).
							</div>
							<div className="chrome-frame-blocked-actions">
								<button type="button" className="chrome-nav-btn" onClick={openExternally}>Open externally</button>
								<button type="button" className="chrome-nav-btn" onClick={copyCurrentUrl}>Copy link</button>
							</div>
						</div>
					</div>
				) : null}
				<iframe
					key={`${activeTabId}:${activeTab?.reloadKey ?? 0}:${currentUrl}`}
					src={currentUrl}
					frameBorder="0"
					height="100%"
					width="100%"
					title="Chrome"
				></iframe>
			</div>
		</div>
	);
}

export default Chrome;
