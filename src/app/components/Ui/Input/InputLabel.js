import React from "react";
import { makeStyles } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    root: {
        lineHeight: "20px",
        color: "#22313F",
        margin: 0,
        marginBottom: theme.spacing(1),
        fontWeight: 500,
        fontSize: "14px"
    },
    require: {
        color: red[500]
    }
}));

function InputLabel({ title, require }) {
    const classes = useStyles();
    return <p className={classes.root}>
        <span>{title}</span> {require ? <span className={classes.require}>*</span> : null}
    </p>
}

export default InputLabel;