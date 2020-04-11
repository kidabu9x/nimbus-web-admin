import React from "react";
import { Route, Switch } from "react-router-dom";
import BlogsList from "./BlogsList";
import BlogEdit from "./BlogEdit";

export default function BlogPage() {
  return (
    <Switch>
      <Route exact path="/blog" component={BlogsList} />
      <Route path="/blog/:id" component={BlogEdit} />
      <Route path="/blog/new" component={BlogEdit} />
    </Switch>
  );
}
