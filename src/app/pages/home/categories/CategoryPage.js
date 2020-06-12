import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";
import CategoriesList from "./CategoriesList";

export default function CategoryPage() {
  return (
    <Switch>
      <Route exact path={ROUTES.blogCategories} component={CategoriesList} />
      <Route path={`${ROUTES.blogCategories}/:id`} component={CategoriesList} />
      <Route path={`${ROUTES.blogCategories}/new`} component={CategoriesList} />
    </Switch>
  );
}
