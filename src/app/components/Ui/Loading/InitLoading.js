import React from "react";
import { ReactComponent as Logo } from "../../../static/images/svg/logo.svg";
import { makeStyles } from '@material-ui/core/styles';
import {
    LinearProgress,
    Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "60vh"
    },
    container: {
        maxWidth: "200px"
    },
    logo: {
        width: "200px",
        height: "auto",
        marginBottom: theme.spacing(1)
    },
    colorPrimary: {
        backgroundColor: '#207347',
    },
    barColorPrimary: {
        backgroundColor: '#508A6B',
    }
}));

export default function LinearDeterminate() {
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={3}>
                <div className={classes.container}>
                    <Logo className={classes.logo} />
                    <LinearProgress classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
                </div>
            </Grid>
        </Grid>

    );
}