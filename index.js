import { HomeView } from "./views/HomeView.js";
import { UserListingView } from "./views/UserListingView.js";
import { UserView } from "./views/UserView.js";

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

const matchingRoute = routes.find((route) => {
  const pattern = new URLPattern(route.path, window.location.origin);
  return pattern.test(window.location.href);
});

if (matchingRoute) {
  document.body.innerHTML = matchingRoute.view();
}

console.log("Matching route", matchingRoute);
