import appConfig from "../data/apps.config";
import AppStateDocument from "../documents/app.document";
import { ACTION_TYPES } from "../documents/enums";
import {
    filterObjectListById,
    replaceObjectListByKey,
} from "../services/common-util-services";

const initialAppState = new AppStateDocument();

const appStateReducer = (state = [initialAppState], action) => {
    var apps = [];
    var currentAppState = {};
    switch (action.type) {
        case ACTION_TYPES.APP_INIT:
            let appsList = appConfig;
            if (
                appsList !== undefined &&
                appsList !== null &&
                appsList.length > 0
            ) {
                for (let i = 0; i < appsList.length; i++) {
                    var newApp = new AppStateDocument();
                    newApp.id = appsList[i].id;
                    newApp.name = appsList[i].name;
                    newApp.icon = appsList[i].icon;
                    newApp.order = appsList[i].order;
                    newApp.showInDesktop = appsList[i].showInDesktop;
                    newApp.showLinks = appsList[i].showLinks;
                    newApp.isApplication = appsList[i].isApplication;
                    newApp.subComponent = appsList[i].subComponent;
                    apps.push(newApp);
                }
            }
            return {
                apps,
            };

        case ACTION_TYPES.APP_CLICK:
            currentAppState = filterObjectListById(state.apps, action.app.id);
            if (currentAppState.isOpened) {
                // If specific index requested, stay open and switch tab. 
                // Otherwise toggle minimize if it was just a general click.
                if (action.app.activeSubComponentIndex !== undefined) {
                    currentAppState.isMinimized = false;
                    currentAppState.isMaximized = false;
                    currentAppState.isOpened = true;
                    currentAppState.activeSubComponentIndex = action.app.activeSubComponentIndex;
                } else {
                    currentAppState.isMinimized = !currentAppState.isMinimized;
                }
            } else {
                currentAppState.isMinimized = false;
                currentAppState.isMaximized = false;
                currentAppState.isOpened = true;
                if (action.app.activeSubComponentIndex !== undefined) {
                    currentAppState.activeSubComponentIndex = action.app.activeSubComponentIndex;
                }
            }
            apps = replaceObjectListByKey(state.apps, currentAppState, "id");
            return {
                apps,
            };

        case ACTION_TYPES.MINIMIZE:
            currentAppState = filterObjectListById(state.apps, action.app.id);
            currentAppState.isMinimized = true;
            apps = replaceObjectListByKey(state.apps, currentAppState, "id");
            return {
                apps,
            };

        case ACTION_TYPES.MAXIMIZE:
            currentAppState = filterObjectListById(state.apps, action.app.id);
            currentAppState.isMaximized = !currentAppState.isMaximized;
            apps = replaceObjectListByKey(state.apps, currentAppState, "id");
            return {
                apps,
            };

        case ACTION_TYPES.CLOSE:
            currentAppState = filterObjectListById(state.apps, action.app.id);
            currentAppState.isMinimized = false;
            currentAppState.isMaximized = false;
            currentAppState.isOpened = false;
            apps = replaceObjectListByKey(state.apps, currentAppState, "id");
            return {
                apps,
            };

        default:
            return state;
    }
};

export default appStateReducer;
