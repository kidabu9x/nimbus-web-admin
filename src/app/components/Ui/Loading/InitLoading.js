import React from "react";
import { ReactComponent as Logo } from "../../../static/images/svg/logo.svg";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function LinearDeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Logo />
            <LinearProgress />
        </div>
    );
}