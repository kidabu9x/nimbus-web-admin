import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import HomePage from "../pages/home/HomePage";
import ErrorsPage from "../pages/errors/ErrorsPage";
import LogoutPage from "../pages/auth/Logout";
import Layout from "../layout/main";
import AuthPage from "../pages/auth/AuthPage";

export const Routes = withRouter(({ history }) => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );

  return (
    <Switch>
      {!isAuthorized ? (
        <AuthPage />
      ) : (
          <Redirect from="/auth" to="/" />
        )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={LogoutPage} />

      {!isAuthorized ? (
        <Redirect to="/auth/login" />
      ) : (
          <Layout>
            <HomePage />
          </Layout>
        )}
    </Switch>
  );
});
