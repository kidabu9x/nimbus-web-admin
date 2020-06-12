import React, { useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import LogoutPage from "../pages/auth/LogoutPage";
import Layout from "../layout";
import Login from "../pages/auth/LoginPage";
import Dashboard from "../pages/home/Dashboard";
import BlogPage from "../pages/home/blogs/BlogPage";
import CategoryPage from "../pages/home/categories/CategoryPage";
import InitLoading from "../components/Ui/Loading/InitLoading";
import { ROUTES } from "./Routes";
import { getUserProfile, logout } from "../store/auth/actions";

export default withRouter(() => {
    const {
        isLoggedIn,
        requesting,
        isAuthorized
    } = useSelector(
        ({ auth }) => ({
            isLoggedIn: auth.token != null,
            isAuthorized: auth.user != null,
            requesting: auth.requesting
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserProfile());
        } else {
            setTimeout(() => {
                dispatch(logout());
            }, 50);
        }
    }, [isLoggedIn, dispatch]);

    if (requesting) {
        return <InitLoading />
    }

    return (
        <Switch>
            {!isAuthorized ?
                <Route path={ROUTES.auth} component={Login} />
                :
                <Redirect from={ROUTES.auth} to={ROUTES.dashboard} />
            }

            {!isAuthorized ?
                <Redirect to={ROUTES.auth} />
                : (
                    <Layout>
                        <Switch>
                            <Route path={ROUTES.blogCategories} component={CategoryPage} />
                            <Route path={ROUTES.blogs} component={BlogPage} />
                            <Route path={ROUTES.dashboard} component={Dashboard} />
                        </Switch>
                    </Layout>
                )
            }
            <Route path={ROUTES.logout} component={LogoutPage} />
        </Switch>
    );
});
