import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from 'notistack';
import Routes from "./app/router";
import ThemeProvider from "./app/theme/ThemeProvider";
import "./App.css";
import "./app/static/css/ck-editor.css";

export default function App({ store, persistor, basename }) {
  return (
    <Provider store={store} loading={null}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename={basename}>
          <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
              <Routes />
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
