import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import BlogPage from "./blogs/BlogPage";
import { ROUTES } from "../../../_metronic/utils/routerList";
import CategoryPage from "./categories/CategoryPage";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to={ROUTES.dashboard} />
        }
        <Route path="/builder" component={Builder} />
        <Route path={ROUTES.blogs} component={BlogPage} />
        <Route path={ROUTES.categories} component={CategoryPage} />
        <Route path={ROUTES.dashboard} component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Redirect to={`${ROUTES.error}/error-v1`} />
      </Switch>
    </Suspense>
  );
}
