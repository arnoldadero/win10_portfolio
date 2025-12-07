import React, { useState, useRef, useEffect } from "react";
import { IconButton } from "@fluentui/react";
import { ACTION_TYPES } from "../../utils/documents/enums";
import "./windowFrame.scss";
import LazyImage from "../base/lazyImage";

export default function WindowFrame({ children, appInfo, onFunctionClick }) {
    const frameRef = useRef(null);

    const MIN_WIDTH = 300;
    const MIN_HEIGHT = 200;
    const RESIZE_BORDER = 6; // 6px Windows hot-zone

    // Load initial state from localStorage with mobile centering
    const getInitialState = () => {
        const saved = localStorage.getItem(`windowState_${appInfo.id}`);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse window state", e);
            }
        }
        
        // Calculate dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Set size (responsive)
        const width = Math.min(windowWidth * 0.9, 900);
        const height = Math.min(windowHeight * 0.8, 720);
        
        // Calculate position (centered)
        const posX = Math.max(0, (windowWidth - width) / 2);
        const posY = Math.max(0, (windowHeight - height) / 2);
        
        return {
            size: { width, height },
            position: { x: posX, y: posY }
        };
    };

    const initialState = getInitialState();
    const [size, setSize] = useState(initialState.size);
    const [position, setPosition] = useState(initialState.position);

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDir, setResizeDir] = useState(null);

    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState(null);
    const [startPos, setStartPos] = useState(null);

    // Save state to localStorage on change (debounced or on stop)
    useEffect(() => {
        if (!isDragging && !isResizing) {
            localStorage.setItem(`windowState_${appInfo.id}`, JSON.stringify({ size, position }));
        }
    }, [size, position, isDragging, isResizing, appInfo.id]);

    // ----------------------------------------------
    // 🔥 1. Detect which resize zone cursor is over
    // ----------------------------------------------
    const getResizeDirection = (e) => {
        if (appInfo.isMaximized) return null;
        const rect = frameRef.current.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        const left = x - rect.left < RESIZE_BORDER;
        const right = rect.right - x < RESIZE_BORDER;
        const top = y - rect.top < RESIZE_BORDER;
        const bottom = rect.bottom - y < RESIZE_BORDER;

        if (top && left) return "nw";
        if (top && right) return "ne";
        if (bottom && left) return "sw";
        if (bottom && right) return "se";
        if (left) return "w";
        if (right) return "e";
        if (top) return "n";
        if (bottom) return "s";

        return null;
    };

    // ----------------------------------------------
    // 🧲 2. Update cursor when hovering borders
    // ----------------------------------------------
    const handleMouseMove = (e) => {
        if (isResizing || appInfo.isMaximized) return;

        const dir = getResizeDirection(e);
        if (frameRef.current) {
            frameRef.current.style.cursor = dir ? `${dir}-resize` : "default";
        }
    };

    // ----------------------------------------------
    // 🔧 3. Start Resize
    // ----------------------------------------------
    const handleMouseDown = (e) => {
        if (appInfo.isMaximized) return;
        const dir = getResizeDirection(e);
        if (!dir) return;

        setIsResizing(true);
        setResizeDir(dir);
        setMouseStart({ x: e.clientX, y: e.clientY });
        setStartSize(size);
        setStartPos(position);
        e.preventDefault();
    };

    // ----------------------------------------------
    // 🔧 4. Perform Resize
    // ----------------------------------------------
    const handleWindowMouseMove = (e) => {
        if (!isResizing) return;

        const dx = e.clientX - mouseStart.x;
        const dy = e.clientY - mouseStart.y;

        let newWidth = startSize.width;
        let newHeight = startSize.height;
        let newX = startPos.x;
        let newY = startPos.y;

        if (resizeDir.includes("e")) newWidth = startSize.width + dx;
        if (resizeDir.includes("s")) newHeight = startSize.height + dy;
        if (resizeDir.includes("w")) {
            newWidth = startSize.width - dx;
            newX = startPos.x + dx;
        }
        if (resizeDir.includes("n")) {
            newHeight = startSize.height - dy;
            newY = startPos.y + dy;
        }

        // Boundaries - enforce minimum size only, allow position to overflow
        newWidth = Math.max(MIN_WIDTH, newWidth);
        newHeight = Math.max(MIN_HEIGHT, newHeight);

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
    };

    // ----------------------------------------------
    // 🔧 5. Stop Resize
    // ----------------------------------------------
    const stopResize = () => {
        setIsResizing(false);
        setResizeDir(null);
    };

    // ----------------------------------------------
    // 🖱️ Dragging via title bar
    // ----------------------------------------------
    const startDrag = (e) => {
        if (isResizing || appInfo.isMaximized) return;

        // Prevent drag if clicking on buttons
        if (e.target.closest('button')) return;

        setIsDragging(true);
        setMouseStart({ x: e.clientX, y: e.clientY });
        setStartPos(position);
        frameRef.current?.classList.add('dragging');
    };

    const dragMove = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - mouseStart.x;
        const dy = e.clientY - mouseStart.y;

        setPosition({
            x: startPos.x + dx,
            y: startPos.y + dy
        });
    };

    const stopDrag = () => {
        setIsDragging(false);
        frameRef.current?.classList.remove('dragging');
    };

    // ----------------------------------------------
    // ⌨️ Keyboard Accessibility
    // ----------------------------------------------
    const handleKeyDown = (e) => {
        if (appInfo.isMaximized) return;

        const step = 10;
        const shift = e.shiftKey;

        switch (e.key) {
            case "ArrowRight":
                if (shift) setSize(prev => ({ ...prev, width: Math.min(prev.width + step, window.innerWidth - position.x) }));
                else setPosition(prev => ({ ...prev, x: Math.min(prev.x + step, window.innerWidth - size.width) }));
                break;
            case "ArrowLeft":
                if (shift) setSize(prev => ({ ...prev, width: Math.max(prev.width - step, MIN_WIDTH) }));
                else setPosition(prev => ({ ...prev, x: Math.max(prev.x - step, 0) }));
                break;
            case "ArrowDown":
                if (shift) setSize(prev => ({ ...prev, height: Math.min(prev.height + step, window.innerHeight - position.y) }));
                else setPosition(prev => ({ ...prev, y: Math.min(prev.y + step, window.innerHeight - size.height) }));
                break;
            case "ArrowUp":
                if (shift) setSize(prev => ({ ...prev, height: Math.max(prev.height - step, MIN_HEIGHT) }));
                else setPosition(prev => ({ ...prev, y: Math.max(prev.y - step, 0) }));
                break;
            case "Enter":
                onFunctionClick(appInfo, ACTION_TYPES.MAXIMIZE);
                break;
            default:
                return;
        }
        e.preventDefault();
    };

    // Global listeners
    useEffect(() => {
        window.addEventListener("mousemove", handleWindowMouseMove);
        window.addEventListener("mouseup", stopResize);
        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", stopDrag);
        return () => {
            window.removeEventListener("mousemove", handleWindowMouseMove);
            window.removeEventListener("mouseup", stopResize);
            window.removeEventListener("mousemove", dragMove);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, []);

    // Re-trigger animation on launch
    useEffect(() => {
        if (frameRef.current) {
            frameRef.current.classList.remove('launching');
            // Force reflow to restart the animation
            void frameRef.current.offsetWidth;
            frameRef.current.classList.add('launching');
        }
    }, [appInfo.id, appInfo.isMaximized]);

    const containerStyle = appInfo.isMaximized ? {
        width: "100%",
        height: "100%",
        transform: "translate(0px, 0px)",
        top: 0,
        left: 0,
        borderRadius: 0
    } : {
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`
    };

    return (
        <div
            className={`window-frame ${appInfo.isMaximized ? "maximized" : ""} launching`}
            ref={frameRef}
            style={containerStyle}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-label={appInfo.name}
        >
            <div className="title-bar" onMouseDown={startDrag} onDoubleClick={() =>
                onFunctionClick(appInfo, ACTION_TYPES.MAXIMIZE)
            }>
                <div className="app-title uk-background-secondary uk-border-rounded">
                    <span className="uk-margin-medium-right uk-margin-small-left uk-flex uk-flex-middle">
                        {appInfo.icon && (
                            <LazyImage
                                src={appInfo.icon}
                                alt={appInfo.name}
                                width="20"
                                height="20"
                                className="uk-margin-small-right"
                            />
                        )}
                        <span className="uk-margin-small-top">{appInfo.name}</span>
                    </span>
                </div>

                <div className="app-top-functions uk-flex">
                <IconButton
                    iconProps={{ iconName: "ChromeMinimize" }}
                    title="Minimize (Alt+M)"
                    ariaLabel="Minimize window"
                    data-tooltip="Minimize - Keyboard: Alt+M"
                    onClick={() => onFunctionClick(appInfo, ACTION_TYPES.MINIMIZE)}
                />
                <IconButton
                    iconProps={{ iconName: "ChromeRestore" }}
                    title={appInfo.isMaximized ? "Restore (Alt+R)" : "Maximize (Alt+X)"}
                    ariaLabel={appInfo.isMaximized ? "Restore window" : "Maximize window"}
                    data-tooltip={appInfo.isMaximized ? "Restore - Keyboard: Alt+R" : "Maximize - Keyboard: Alt+X"}
                    onClick={() => onFunctionClick(appInfo, ACTION_TYPES.MAXIMIZE)}
                />
                <IconButton
                    iconProps={{ iconName: "ChromeClose" }}
                    title="Close (Alt+F4)"
                    ariaLabel="Close window"
                    data-tooltip="Close - Keyboard: Alt+F4"
                    className="close-button"
                    onClick={() => onFunctionClick(appInfo, ACTION_TYPES.CLOSE)}
                />
                </div>
            </div>

            <div className="window-content">
                {children}
            </div>
        </div>
    );
}
