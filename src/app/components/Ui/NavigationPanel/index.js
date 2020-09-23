import React from "react";
import {
    Grid,
    Paper,
    makeStyles,
    Box,
    Typography
} from "@material-ui/core";
import {
    Link
} from "react-router-dom";
import RouterIcon from "../../../router/RouterIcon";

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}));

const itemStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        padding: theme.spacing(1.6),
        borderRadius: 3,
        textDecoration: "none"
    },
    active: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#f9fafb",
            "& $iconContainer": {
                backgroundColor: "#dfe3e8"
            },
            "& $title": {
                color: "#084e8a"
            }
        },
    },
    disable: {
        cursor: "not-allowed",
        pointerEvents: "none",
        opacity: 0.5
    },
    iconContainer: {
        backgroundColor: "#f4f6f8",
        color: "#919eab"
    },
    title: {
        color: "#006fbb"
    },
    description: {
        color: "#637381"
    }
}))

const NavItem = ({ navItem }) => {
    const classes = itemStyles();
    return (

        <Link
            className={`${classes.root} ${navItem.disable ? classes.disable : classes.active}`}
            to={navItem.link}
        >
            <Box
                mr={2}
            >
                <Box
                    className={classes.iconContainer}
                    p={1}
                    borderRadius={3}
                >
                    <RouterIcon link={navItem.link} />
                </Box>
            </Box>
            <Box flex="1">
                <Typography color="inherit" variant="subtitle2">
                    {navItem.title}
                </Typography>
                <Typography color="inherit" variant="caption">
                    {navItem.description}
                </Typography>
            </Box>
        </Link>
    )

}

export default function NavPanel({ navItems }) {
    const classes = styles();
    const responsive = {
        xs: 3,
        sm: 4
    }
    return (
        <Paper className={classes.root}>
            <Grid container>
                {navItems.map(navItem => (
                    <Grid key={navItem.link} item xs={responsive.xs}>
                        <NavItem navItem={navItem} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}