import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";
import CategoriesList from "./CategoriesList";

export default function CategoryPage() {
  return (
    <Switch>
      <Route exact path={ROUTES.categories} component={CategoriesList} />
      <Route path={`${ROUTES.categories}/:id`} component={CategoriesList} />
      <Route path={`${ROUTES.categories}/new`} component={CategoriesList} />
    </Switch>
  );
}
