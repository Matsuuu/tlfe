import { render } from "lit-html";
import { HomeView } from "./views/HomeView.js";
import { UsersView } from "./views/UsersView.js";
import { EventManager, ValueUpdatedEvent } from "./index.js";

const routes = [
    { path: "/", view: HomeView },
    { path: "/users", view: UsersView },
];

let currentRoute;
let currentRouteData;
let currentView;

export function initRouter() {
    findRouteFromCurrentUrl();
    renderCurrentView();
    EventManager.addEventListener(ValueUpdatedEvent.name, ev => {
        refreshView();
    });
}

export function refreshView() {
    renderCurrentView();
}

function findRouteFromCurrentUrl() {
    const currentUrl = window.location.href;
    for (const route of routes) {
        const pattern = new URLPattern(route.path, window.location.origin);
        if (pattern.test(currentUrl)) {
            currentRoute = route;
            currentView = route.view();
            return true;
        }
    }
    return false;
}

function renderCurrentView() {
    document.startViewTransition(() => {
        render(currentView(), document.body);
    });
}

document.addEventListener("click", ev => {
    const path = ev.composedPath();
    // @ts-ignore
    const mostLikelyALinkElement = path.find(elem => elem.href !== undefined);
    if (mostLikelyALinkElement) {
        ev.preventDefault();
        // @ts-ignore
        window.history.pushState({}, null, mostLikelyALinkElement.href);
        findRouteFromCurrentUrl();
        renderCurrentView();
    }
});

window.addEventListener("popstate", ev => {
    ev.preventDefault();
    findRouteFromCurrentUrl();
    renderCurrentView();
});
