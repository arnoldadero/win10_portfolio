import React, { useEffect } from "react";
import { AnalyticsListener } from "./analytics/ga";
import RouteListener from "./components/router/RouteListener";
import "./App.css";
import Loading from "./components/loading/loading";

import { useSelector } from "react-redux";
import { preloadImages } from "./utils/imageOptimization";
import { useLocation } from "react-router-dom";
import { ROUTE_MAP } from "./components/router/RouteListener";

import profileImage from "./assets/images/baseImages/profile.webp";
import aboutMeIcon from "./assets/images/apps/aboutMe.png";

const DesktopContainer = React.lazy(() => import("./containers/desktop.container.jsx"));
const LockScreenContainer = React.lazy(() => import("./containers/lockScreen.container.jsx"));
const BlueScreen404 = React.lazy(() => import("./containers/blueScreen404.container.jsx"));

// Critical images to preload (above-the-fold)
const CRITICAL_IMAGES = [
  profileImage,
  aboutMeIcon,
];

function App() {
  const systemState = useSelector((state) => state.systemState);
  const location = useLocation();
  // Show 404 if path is explicitly /404.html OR if it's not root and not in the route map
  const is404 = location.pathname === "/404.html" || (location.pathname !== "/" && !ROUTE_MAP[location.pathname]);

  // Preload critical images on app mount
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES);
  }, []);

  return (
    <div className="App">
      <AnalyticsListener />
      <RouteListener />
      <React.Suspense fallback={<Loading />}>
        {is404 ? (
          <BlueScreen404 />
        ) : systemState.isLocked ? (
          <LockScreenContainer />
        ) : (
          <DesktopContainer />
        )}
      </React.Suspense>
    </div>
  );
}

export default App;
