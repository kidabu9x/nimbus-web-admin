import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";

export default function AuthPage() {
  return (
    <Switch>
      <Route path="/dang-nhap" component={Login} />
    </Switch>
  );
}
