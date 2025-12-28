import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleApplicationClick } from "../../utils/actions/app.action";

// Map URLs to App IDs and SubComponent Indices
const ROUTE_MAP = {
    "/": null, // Desktop
    "/about": { appId: "aboutMe", index: 0 },
    "/experience": { appId: "aboutMe", index: 1 },
    "/education": { appId: "aboutMe", index: 2 },
    "/projects": { appId: "aboutMe", index: 3 },
    "/skills": { appId: "aboutMe", index: 4 },
    "/resume": { appId: "aboutMe", index: 5 },
    "/contact": { appId: "aboutMe", index: 6 },
    "/services": { appId: "aboutMe", index: 7 },
    "/chrome": { appId: "chrome", index: 0 },
    "/vscode": { appId: "vscode", index: 0 },
    "/spotify": { appId: "jioSaavn", index: 0 },
    "/mail": { appId: "mail", index: 0 }
};

const RouteListener = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // Note: appState can be accessed via useSelector if needed for reverse sync
    // const appState = useSelector((state) => state.appState);

    useEffect(() => {
        const path = location.pathname;
        const routeConfig = ROUTE_MAP[path];

        if (routeConfig) {
            // It's a mapped route, open the app
            dispatch(
                handleApplicationClick({
                    id: routeConfig.appId,
                    activeSubComponentIndex: routeConfig.index,
                })
            );
        } else if (path !== "/") {
            // Handle unknown routes? Maybe redirect to / or keep as is (404 behavior handled by switch)
            // For now, let's just do nothing or maybe log it.
        }
    }, [location, dispatch]);

    // Optional: Reverse Sync (State -> URL)
    // If user opens app manually, update URL. 
    // This is trickier because we need to know WHICH app is currently "focused" or "active".
    // For now, we focus on URL -> App (Deep Linking).

    return null;
};

export default RouteListener;
