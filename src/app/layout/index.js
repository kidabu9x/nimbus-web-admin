import React from 'react';
import clsx from 'clsx';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from "./Drawer";
import {
    rootStyles
} from "./styles";


export default function PersistentDrawerLeft({ children }) {
    const classes = rootStyles();
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(true);
    };

    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar
                color="transparent"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Nimbus Study Hub
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                open={open}
                toggleDrawer={toggleDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </Box>
    );
}
