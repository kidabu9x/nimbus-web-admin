import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./app/router";
import ThemeProvider from "./app/theme/ThemeProvider";

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store} loading={null}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor}>
        <BrowserRouter basename={basename}>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
