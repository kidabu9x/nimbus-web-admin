import React from "react";
import {
    Typography,
    Divider,
    Button
} from "@material-ui/core";
import useStyles from "./styles";

export default function UiCard({ title, action, actionComponent }) {
    const classes = useStyles();
    return <>
        <div className={classes.header}>
            {title && <Typography variant="subtitle2">
                {title}
            </Typography>}
            {action && <Button className={classes.headerAction} color="primary" component={actionComponent ? actionComponent : "button"} >
                {action}
            </Button>
            }
        </div>
        <Divider />
    </>
}