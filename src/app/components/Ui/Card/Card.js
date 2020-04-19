import React from "react";
import { Card } from "@material-ui/core";
import useStyles from "./styles";

function UiCard(props) {
    const classes = useStyles();
    return <Card className={classes.root}>
        {props.children}
    </Card>
}

export default UiCard;