import React from "react";
import { Admin, Resource } from "react-admin";

import "./App.css";

import authProvider from "./authProvider";
import themeReducer from "./themeReducer";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";

import polyglotI18nProvider from "ra-i18n-polyglot";
import vnMessage from "./i18n/vi_VN";
import posts from "./posts";
import dataProvider from "./dataProvider";

const i18nProvider = polyglotI18nProvider(locale => {
  // Always fallback on english
  return vnMessage;
}, "vi");

const App = () => {
  if (!dataProvider) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <Admin
      title=""
      dataProvider={dataProvider}
      customReducers={{ theme: themeReducer }}
      customRoutes={customRoutes}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
    >
      <Resource name="posts" {...posts} />
    </Admin>
  );
};

export default App;
