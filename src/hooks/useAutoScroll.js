import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for mobile continuous auto-scroll functionality
 * Automatically scrolls through sections on mobile devices
 * Can be paused by user interaction or hover
 * 
 * @param {HTMLElement} containerRef - Reference to the scrollable container
 * @param {Array} sections - Array of section names/indices to scroll through
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether auto-scroll is enabled (default: true)
 * @param {number} options.mobileBreakpoint - Breakpoint pixel value for mobile detection (default: 768)
 * @param {number} options.scrollDelay - Delay in ms before auto-scrolling to next section (default: 4000)
 * @param {number} options.scrollDuration - Duration of scroll animation in ms (default: 800)
 * @param {boolean} options.pauseOnHover - Pause auto-scroll on hover (default: true)
 * @param {boolean} options.pauseOnScroll - Pause auto-scroll when user manually scrolls (default: true)
 * @returns {Object} Hook state and controls
 */
export const useAutoScroll = (
	containerRef,
	sections = [],
	options = {}
) => {
	const {
		enabled = true,
		mobileBreakpoint = 768,
		scrollDelay = 4000,
		scrollDuration = 800,
		axis = 'x',
		pauseOnHover = true,
		pauseOnScroll = true,
	} = options;

	const [isMobile, setIsMobile] = useState(() => window.innerWidth <= mobileBreakpoint);
	const [isAutoScrolling, setIsAutoScrolling] = useState(enabled);
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const scrollTimeoutRef = useRef(null);
	const scrollAnimationRef = useRef(null);
	const lastScrollTimeRef = useRef(0);
	const userInteractionTimeoutRef = useRef(null);
	const isUserScrollingRef = useRef(false);
	const scrollStartTimeRef = useRef(0);
	const scrollStartPositionRef = useRef(0);

	// Detect mobile viewport
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= mobileBreakpoint;
			setIsMobile(mobile);
			setIsAutoScrolling(mobile && enabled);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [mobileBreakpoint, enabled]);

	// Smooth scroll to position using requestAnimationFrame
	const smoothScrollTo = useCallback((targetPosition) => {
		if (!containerRef.current) return;

		const startPosition = axis === 'y'
			? containerRef.current.scrollTop || 0
			: containerRef.current.scrollLeft || 0;
		const distance = targetPosition - startPosition;
		scrollStartTimeRef.current = Date.now();
		scrollStartPositionRef.current = startPosition;

		const animate = () => {
			const currentTime = Date.now();
			const elapsed = currentTime - scrollStartTimeRef.current;
			const progress = Math.min(elapsed / scrollDuration, 1);

			// Easing function: easeInOutCubic for smooth natural motion
			const easeProgress = progress < 0.5
				? 4 * progress * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;

			if (containerRef.current) {
				if (axis === 'y') {
					containerRef.current.scrollTop = scrollStartPositionRef.current + distance * easeProgress;
				} else {
					containerRef.current.scrollLeft = scrollStartPositionRef.current + distance * easeProgress;
				}
			}

			if (progress < 1) {
				scrollAnimationRef.current = requestAnimationFrame(animate);
			} else {
				if (containerRef.current) {
					if (axis === 'y') {
						containerRef.current.scrollTop = targetPosition;
					} else {
						containerRef.current.scrollLeft = targetPosition;
					}
				}
				scrollAnimationRef.current = null;
			}
		};

		// Cancel any ongoing animation
		if (scrollAnimationRef.current) {
			cancelAnimationFrame(scrollAnimationRef.current);
		}

		scrollAnimationRef.current = requestAnimationFrame(animate);
	}, [scrollDuration]);

	// Scroll to specific section
	const scrollToSection = useCallback((sectionIndex) => {
		if (!containerRef.current || sectionIndex < 0 || sectionIndex >= sections.length) {
			return;
		}

		const container = containerRef.current;
		const children = container.children;

		if (children[sectionIndex]) {
			const targetPosition = axis === 'y'
				? children[sectionIndex].offsetTop
				: children[sectionIndex].offsetLeft;
			smoothScrollTo(targetPosition);
			setCurrentSectionIndex(sectionIndex);
		}
	}, [axis, sections.length, smoothScrollTo]);

	// Auto-scroll to next section
	const scrollToNextSection = useCallback(() => {
		if (!isAutoScrolling || !isMobile || sections.length === 0 || isPaused) {
			return;
		}

		const nextIndex = (currentSectionIndex + 1) % sections.length;
		scrollToSection(nextIndex);
	}, [isAutoScrolling, isMobile, sections.length, isPaused, currentSectionIndex, scrollToSection]);

	// Setup auto-scroll interval
	useEffect(() => {
		if (!isAutoScrolling || !isMobile || sections.length === 0 || isPaused) {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
				scrollTimeoutRef.current = null;
			}
			return;
		}

		// Initial scroll delay before first auto-scroll
		scrollTimeoutRef.current = setTimeout(() => {
			scrollToNextSection();
			
			// Set up recurring auto-scroll
			const interval = setInterval(scrollToNextSection, scrollDelay + scrollDuration);
			
			// Store interval ID for cleanup
			if (scrollTimeoutRef.current !== null) {
				scrollTimeoutRef.current = interval;
			}
		}, scrollDelay);

		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
				clearInterval(scrollTimeoutRef.current);
				scrollTimeoutRef.current = null;
			}
		};
	}, [isAutoScrolling, isMobile, sections.length, isPaused, scrollDelay, scrollToNextSection]);

	// Handle manual scroll detection
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !pauseOnScroll) return;

		const handleScroll = () => {
			const now = Date.now();
			lastScrollTimeRef.current = now;
			isUserScrollingRef.current = true;
			setIsPaused(true);

			// Resume auto-scroll after user stops scrolling
			if (userInteractionTimeoutRef.current) {
				clearTimeout(userInteractionTimeoutRef.current);
			}

			userInteractionTimeoutRef.current = setTimeout(() => {
				setIsPaused(false);
				isUserScrollingRef.current = false;
			}, 3000); // Resume after 3 seconds of inactivity
		};

		container.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			container.removeEventListener('scroll', handleScroll);
			if (userInteractionTimeoutRef.current) {
				clearTimeout(userInteractionTimeoutRef.current);
			}
		};
	}, [pauseOnScroll]);

	// Handle hover pause
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !pauseOnHover) return;

		const handleMouseEnter = () => {
			setIsPaused(true);
		};

		const handleMouseLeave = () => {
			setIsPaused(false);
		};

		container.addEventListener('mouseenter', handleMouseEnter);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			container.removeEventListener('mouseenter', handleMouseEnter);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [pauseOnHover]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
				clearInterval(scrollTimeoutRef.current);
			}
			if (scrollAnimationRef.current) {
				cancelAnimationFrame(scrollAnimationRef.current);
			}
			if (userInteractionTimeoutRef.current) {
				clearTimeout(userInteractionTimeoutRef.current);
			}
		};
	}, []);

	return {
		isMobile,
		isAutoScrolling,
		isPaused,
		currentSectionIndex,
		scrollToSection,
		setIsAutoScrolling,
		setIsPaused,
	};
};

export default useAutoScroll;
