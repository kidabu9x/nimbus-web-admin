import React from 'react';
import {
    CssBaseline,
    Box,
} from '@material-ui/core';

import Drawer from "./Drawer";
import AppBar from "./AppBar";
import {
    rootStyles
} from "./styles";


export default function PersistentDrawerLeft({ children }) {
    const classes = rootStyles();

    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar />
            <Drawer />
            <main
                className={classes.content}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </Box>
    );
}