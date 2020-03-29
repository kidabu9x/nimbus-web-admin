import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';

import categories from './categories';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';

const App = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        let restoreFetch;

        const fetchDataProvider = async () => {
            restoreFetch = await fakeServerFactory(
                process.env.REACT_APP_DATA_PROVIDER
            );
            const dataProviderInstance = await dataProviderFactory(
                process.env.REACT_APP_DATA_PROVIDER
            );
            setDataProvider(
                // GOTCHA: dataProviderInstance can be a function
                () => dataProviderInstance
            );
        };

        fetchDataProvider();

        return restoreFetch;
    }, []);

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
        >
            <Resource name="categories" {...categories} />
        </Admin>
    );
};

export default App;
