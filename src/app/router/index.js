import React, { useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import LogoutPage from "../pages/auth/Logout";
import Layout from "../layout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/home/Dashboard";
import BlogPage from "../pages/home/blogs/BlogPage";
import CategoryPage from "../pages/home/categories/CategoryPage";
import InitLoading from "../components/Ui/Loading/InitLoading";
import { ROUTES } from "./Routes";
import { getUserProfile } from "../store/auth/actions";

export default withRouter(() => {
    const {
        requesting,
        isAuthorized
    } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null,
            requesting: auth.requesting
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    if (requesting) {
        return <InitLoading />
    }

    return (
        <Switch>
            <Route path="/logout" component={LogoutPage} />
            <Route path="/dang-nhap" component={Login} />

            {!isAuthorized ?
                <Redirect to="/dang-nhap" />
                : (
                    <Layout>
                        <Switch>
                            <Route path={ROUTES.blogs} component={BlogPage} />
                            <Route path={ROUTES.blogCategories} component={CategoryPage} />
                            <Route path={ROUTES.dashboard} component={Dashboard} />
                        </Switch>
                    </Layout>
                )}
        </Switch>
    );
});
