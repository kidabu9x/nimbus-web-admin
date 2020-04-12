import React from "react";
import { Route, Switch } from "react-router-dom";
import BlogsList from "./BlogsList";
import BlogEdit from "./BlogEdit";
import { ROUTES } from "../../../../_metronic/utils/routerList";

export default function BlogPage() {
  return (
    <Switch>
      <Route exact path={ROUTES.blogs} component={BlogsList} />
      <Route path={`${ROUTES.blogs}/:id`} component={BlogEdit} />
      <Route path={`${ROUTES.blogs}/new`} component={BlogEdit} />
    </Switch>
  );
}
