import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";

export default function AuthPage() {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />

      <Redirect from="/auth" exact={true} to="/auth/login" />
      <Redirect to="/auth/login" />
    </Switch>
  );
}
