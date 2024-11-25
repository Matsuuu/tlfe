import { render } from "lit";
import { HomeView } from "./views/HomeView.js";
import { UserListingView } from "./views/UserListingView.js";
import { UserView } from "./views/UserView.js";

export class NavigationEvent extends Event {
    /**
     * @param {View} view
     * @param {Record<string, string>} [params]
     */
    constructor(view, params) {
        super(NavigationEvent.name);
        this.view = view;
        this.params = params;
    }
}

/**
 * @typedef View
 * @prop path { string }
 * @prop view { () => () => import("lit").TemplateResult }
 * */

class RouterStateInstance extends EventTarget {
    /**
     * @type {() => import("lit").TemplateResult}
     */
    currentView;

    /**
     * @type { Record<string, string>}
     * */
    currentViewParams;

    constructor() {
        super();
        this.addEventListener(NavigationEvent.name, this);
    }

    /**
     * @param {Event | CustomEvent} ev
     */
    handleEvent(ev) {
        if (ev instanceof NavigationEvent) {
            this.currentView = ev.view.view();
            this.params = ev.params;
            this.reRender();
        }
    }

    reRender() {
        if (this.currentView) {
            render(this.currentView(), document.body);
        }
    }
}

export const RouterState = new RouterStateInstance();
const routes = [
    {
        path: "/",
        view: HomeView,
    },
    {
        path: "/users",
        view: UserListingView,
    },
    {
        path: "/users/:id",
        view: UserView,
    },
];

let matchingRoute;
let matchData;

for (const route of routes) {
    let origin = window.location.origin;
    if (window.location.host.startsWith("matsuuu.github")) {
        origin += "/tlfe";
    }
    const pattern = new URLPattern(route.path, origin);
    const match = pattern.exec(window.location.href);
    if (match) {
        matchingRoute = route;
        matchData = match;
        break;
    }
}

if (matchingRoute) {
    RouterState.dispatchEvent(new NavigationEvent(matchingRoute, matchData.pathname.groups));
}
