import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import LogoutPage from "../pages/auth/Logout";
import Layout from "../layout";
import AuthPage from "../pages/auth/AuthPage";
import Dashboard from "../pages/home/Dashboard";
import BlogPage from "../pages/home/blogs/BlogPage";
import CategoryPage from "../pages/home/categories/CategoryPage";
import { ROUTES } from "./Routes";

export default withRouter(({ history }) => {
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

            <Route path="/logout" component={LogoutPage} />

            {!isAuthorized ? (
                <Redirect to="/auth/login" />
            ) : (
                    <Layout>
                        <Switch>
                            <Route path={ROUTES.blogs} component={BlogPage} />
                            <Route path={ROUTES.categories} component={CategoryPage} />
                            <Route path={ROUTES.dashboard} component={Dashboard} />
                            <Redirect to={`${ROUTES.error}/error-v1`} />
                        </Switch>
                    </Layout>
                )}
        </Switch>
    );
});
