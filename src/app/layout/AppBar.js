import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    appBarStyle
} from "./styles";
import {
    logout
} from "../store/auth/actions";
import { useDispatch } from 'react-redux';


export default function CustomAppBar() {
    const classes = appBarStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <AppBar
            color="default"
            position="fixed"
            className={classes.appBar}
            elevation={0}
        >
            <Toolbar>
                <Typography
                    className={classes.title}
                    variant="subtitle1"
                    noWrap
                >
                    Nimbus Study Hub
                </Typography>

                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}