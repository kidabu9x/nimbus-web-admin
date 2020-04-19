import React from "react";
import { CardContent } from "@material-ui/core";
import useStyles from "./styles";

function UiCard({ children, className }) {
    const classes = useStyles();
    return <CardContent className={`${classes.content} ${className ? className : ''}`}>
        {children}
    </CardContent>
}

export default UiCard;