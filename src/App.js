import React, { useEffect } from "react";
import "./App.css";
import DesktopContainer from "./containers/desktop.container";
import { preloadImages } from "./utils/imageOptimization";

// Critical images to preload (above-the-fold)
const CRITICAL_IMAGES = [
  require("./assets/images/baseImages/profile.png").default,
  require("./assets/images/apps/aboutMe.png").default,
];

function App() {
  // Preload critical images on app mount
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES);
  }, []);

  return (
    <div className="App">
      <DesktopContainer />
    </div>
  );
}

export default App;
