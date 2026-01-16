# Mobile Scroll Testing Guide

## Quick Start Testing

### 1. Chrome DevTools Mobile Testing

```
Steps:
1. Open the portfolio: https://arnoldadero.onrender.com/about
2. Press F12 to open DevTools
3. Press Ctrl+Shift+M to toggle device toolbar
4. Select devices: iPhone 12, Pixel 5, Galaxy Fold, iPad
5. Test scroll and navigation
```

### 2. Key Test Scenarios

#### Scenario A: Basic Scroll
- [ ] Navigate to About component
- [ ] Scroll down on mobile view
- [ ] Verify: No jank, smooth animation, content visible
- [ ] Check: No layout shifts or jumps

#### Scenario B: Auto-Scroll on Mobile
- [ ] Open About on mobile (≤768px)
- [ ] Wait 5 seconds
- [ ] Verify: Auto-scroll starts smoothly
- [ ] Check: No overlapping sections

#### Scenario C: Manual Scroll Override
- [ ] Open About on mobile
- [ ] Wait for auto-scroll to start
- [ ] Manually scroll (pause auto-scroll)
- [ ] Verify: Auto-scroll pauses correctly
- [ ] Wait 3 seconds for resume
- [ ] Verify: Auto-scroll resumes smoothly

#### Scenario D: Navigation Controls
- [ ] Use Back/Forward arrows
- [ ] Click section tabs in dropdown menu
- [ ] Verify: Smooth scroll to section
- [ ] Check: No layout breaks

#### Scenario E: Responsive Breakpoints
Test each breakpoint by setting viewport width:
- [ ] 768px (Tablet) - Proper list layout
- [ ] 640px (Large phone) - Centered content
- [ ] 480px (Standard phone) - Minimal padding
- [ ] 360px (Small phone) - Readable text
- [ ] 320px (iPhone SE) - All content accessible

### 3. Performance Testing

#### FPS Monitoring
```
DevTools → Performance Tab:
1. Click record button
2. Scroll for 5 seconds
3. Stop recording
4. Check FPS graph
Expected: 60 FPS (green line at top)
```

#### Memory Leak Check
```
DevTools → Memory Tab:
1. Take heap snapshot (before)
2. Scroll up/down 50 times
3. Take heap snapshot (after)
4. Compare sizes
Expected: Similar size (no memory leak)
```

#### Layout Shift Test
```
DevTools → Rendering Tab:
1. Check "Paint flashing"
2. Scroll page
3. Verify: Minimal repaints
Expected: Purple highlights only on scroll
```

### 4. Accessibility Testing

```
Keyboard Navigation:
1. Press Tab to navigate
2. Verify: All interactive elements focusable
3. Press Enter to activate buttons
4. Check: Focus visible at all times

Screen Reader Test (Windows Narrator):
1. Press Windows + Enter to start Narrator
2. Navigate sections
3. Verify: Content announced properly
4. Check: No skipped elements
```

### 5. Cross-Browser Testing

#### Chrome Mobile
- [ ] Chrome Android latest
- [ ] Chrome latest desktop with device toolbar

#### Firefox Mobile
- [ ] Firefox Android
- [ ] Firefox desktop with responsive design mode

#### Safari Mobile
- [ ] iOS Safari (requires Mac/iPhone)
- [ ] Check for -webkit properties working

#### Samsung Internet
- [ ] Samsung Galaxy devices
- [ ] Verify momentum scrolling

### 6. Specific CSS Checks

#### Check Overflow Properties
Open DevTools → Elements, inspect `.app-content`:
```
Expected CSS:
overflow-y: auto !important;
overflow-x: hidden !important;
scroll-behavior: smooth;
-webkit-overflow-scrolling: touch;
```

#### Verify Flex Layout
Inspect `ul.uk-switcher`:
```
Expected CSS:
display: flex;
flex-direction: column;
width: 100%;
```

Inspect `ul.uk-switcher > li`:
```
Expected CSS:
flex: 0 0 auto;
width: 100%;
overflow: visible;
overflow-y: auto;
```

#### Check Media Query Application
In DevTools, with 768px width:
```
Check computed styles show:
- overflow-y: auto (not hidden)
- overflow-x: hidden
- scroll-behavior: smooth
```

### 7. Common Issues to Check

#### Issue: Scroll Not Smooth
- [ ] Verify `scroll-behavior: smooth` is applied
- [ ] Check for conflicting `scroll-behavior: auto` 
- [ ] Ensure `-webkit-overflow-scrolling: touch` present

#### Issue: Content Overlapping
- [ ] Check list items have proper padding
- [ ] Verify margin not accumulating
- [ ] Ensure width: 100% on all sections

#### Issue: Layout Shifts During Scroll
- [ ] Verify position not changing during scroll
- [ ] Check for margin/padding changes in media query
- [ ] Ensure flex-shrink: 0 on list items

#### Issue: Auto-Scroll Not Working
- [ ] Check viewport width ≤768px
- [ ] Verify auto-scroll not paused (3-sec timeout)
- [ ] Check console for JavaScript errors
- [ ] Inspect hook: `const autoScrollConfig = useAutoScroll(...)`

#### Issue: Touch Scrolling Laggy
- [ ] Verify `-webkit-overflow-scrolling: touch` present
- [ ] Check for heavy animations during scroll
- [ ] Ensure `will-change: transform` not overused
- [ ] Look for JavaScript blocking scroll events

### 8. DevTools Console Commands

```javascript
// Test scroll smoothness
function testScroll() {
    const container = document.querySelector('.app-content');
    console.log('Scroll behavior:', getComputedStyle(container).scrollBehavior);
    console.log('Overflow Y:', getComputedStyle(container).overflowY);
    console.log('Overflow X:', getComputedStyle(container).overflowX);
}
testScroll();

// Check list item layout
function checkLayout() {
    const items = document.querySelectorAll('.uk-switcher > li');
    items.forEach((item, i) => {
        const computed = getComputedStyle(item);
        console.log(`Item ${i}:`, {
            display: computed.display,
            flex: computed.flex,
            width: computed.width,
            overflow: computed.overflow,
            overflowY: computed.overflowY
        });
    });
}
checkLayout();

// Monitor scroll position
function monitorScroll() {
    const container = document.querySelector('.app-content');
    container.addEventListener('scroll', () => {
        console.log('Scroll:', container.scrollTop);
    });
}
monitorScroll();
```

### 9. Mobile Device Emulation Presets

#### iPhone 12
- Viewport: 390 × 844
- Pixel Ratio: 3
- Touch: Yes
- User Agent: Apple

#### Pixel 5
- Viewport: 393 × 851
- Pixel Ratio: 2.75
- Touch: Yes
- User Agent: Android

#### iPad Air
- Viewport: 820 × 1180
- Pixel Ratio: 2
- Touch: Yes
- User Agent: Apple

#### Galaxy Fold
- Viewport: 280 × 653
- Pixel Ratio: 3.5
- Touch: Yes
- User Agent: Android

### 10. Before/After Comparison

#### Before Fixes
- ❌ Jank during scroll (30-45fps)
- ❌ Layout shifts
- ❌ Content overflow
- ❌ List items not stacking properly
- ❌ Auto-scroll not smooth

#### After Fixes
- ✅ Smooth 60fps scrolling
- ✅ No layout shifts
- ✅ Proper overflow handling
- ✅ Vertical stacking on mobile
- ✅ Smooth auto-scroll animations

### 11. Performance Metrics

Using Lighthouse (in DevTools):
```
Steps:
1. Open DevTools
2. Ctrl+Shift+P → "Lighthouse"
3. Select "Mobile" mode
4. Run audit
5. Check metrics:
   - First Contentful Paint < 3s
   - Largest Contentful Paint < 4s
   - Cumulative Layout Shift < 0.1
   - First Input Delay < 100ms
```

### 12. Regression Testing

Run these tests after each update:
- [ ] Scroll works smoothly (60fps)
- [ ] No console errors
- [ ] Mobile layout correct
- [ ] Auto-scroll functions
- [ ] Touch scrolling responsive
- [ ] All sections accessible
- [ ] Responsive design working
- [ ] Performance not degraded

## Notes

- Test on actual devices when possible (emulation has limitations)
- Clear browser cache between tests (DevTools: Ctrl+Shift+Delete)
- Test both in portrait and landscape orientations
- Test with various network speeds (DevTools → Network throttling)
- Test with screen readers (NVDA, JAWS, or native screen readers)
