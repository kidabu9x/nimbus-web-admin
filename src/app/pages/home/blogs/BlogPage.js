import React from "react";
import { Route, Switch } from "react-router-dom";
import BlogsList from "./BlogsList";
import BlogEdit from "./BlogEdit";

export default function BlogPage() {
  return (
    <Switch>
      <Route path="/blogs" component={BlogsList} />
      <Route path="/blogs/edit/:id" component={BlogEdit} />
    </Switch>
  );
}
