import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";

export default function CoursePage() {
  return (
    <Switch>
      <Route path={`${ROUTES.cms.course()}`} component={() => (<h3>HelloWorld</h3>)} />
    </Switch>
  );
}
