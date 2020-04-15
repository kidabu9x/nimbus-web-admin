import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import BlogPage from "./blogs/BlogPage";
import { ROUTES } from "../../../_metronic/utils/routerList";
import CategoryPage from "./categories/CategoryPage";
import { SnackbarProvider } from "notistack";
export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to={ROUTES.dashboard} />
          }
          <Route path={ROUTES.blogs} component={BlogPage} />
          <Route path={ROUTES.categories} component={CategoryPage} />
          <Route path={ROUTES.dashboard} component={Dashboard} />
          <Redirect to={`${ROUTES.error}/error-v1`} />
        </Switch>
      </SnackbarProvider>
    </Suspense>
  );
}
