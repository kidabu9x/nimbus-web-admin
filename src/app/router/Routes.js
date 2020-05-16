import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import HomePage from "../pages/home/HomePage";
import ErrorsPage from "../pages/errors/ErrorsPage";
import LogoutPage from "../pages/auth/Logout";
import { LayoutContextProvider } from "../../_metronic";
import Layout from "../../_metronic/layout/Layout";
import * as routerHelpers from "../router/RouterHelpers";
import AuthPage from "../pages/auth/AuthPage";
import { SnackbarProvider } from "notistack";

export const Routes = withRouter(({ history }) => {
  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const { isAuthorized, menuConfig, userLastLocation } = useSelector(
    ({ auth, urls, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: auth.user != null,
      userLastLocation: routerHelpers.getLastLocation(),
    }),
    shallowEqual
  );

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Switch>
          {!isAuthorized ? (
            <AuthPage />
          ) : (
              <Redirect from="/auth" to={userLastLocation} />
            )}

          <Route path="/error" component={ErrorsPage} />
          <Route path="/logout" component={LogoutPage} />

          {!isAuthorized ? (
            <Redirect to="/auth/login" />
          ) : (
              <Layout>
                <HomePage userLastLocation={userLastLocation} />
              </Layout>
            )}
        </Switch>
      </SnackbarProvider>
    </LayoutContextProvider>
  );
});
