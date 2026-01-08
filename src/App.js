import React, { useEffect } from "react";
import { AnalyticsListener } from "./analytics/ga";
import RouteListener from "./components/router/RouteListener";
import "./App.css";
import LockScreenContainer from "./containers/lockScreen.container";
import BlueScreen404 from "./containers/blueScreen404.container";
import Loading from "./components/loading/loading";

import { useSelector } from "react-redux";
import { preloadImages } from "./utils/imageOptimization";
import { useLocation } from "react-router-dom";
import { ROUTE_MAP } from "./components/router/RouteListener";

const DesktopContainer = React.lazy(() => import("./containers/desktop.container"));

// Critical images to preload (above-the-fold)
const CRITICAL_IMAGES = [
  require("./assets/images/baseImages/profile.webp").default,
  require("./assets/images/apps/aboutMe.png").default,
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
      {is404 ? (
        <BlueScreen404 />
      ) : systemState.isLocked ? (
        <LockScreenContainer />
      ) : (
        <React.Suspense fallback={<Loading />}>
          <DesktopContainer />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
