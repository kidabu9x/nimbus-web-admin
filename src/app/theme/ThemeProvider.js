import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme(
    {
        palette: {
            contrastThreshold: 2,
            primary: {
                main: "#207347",
            }
        },
        props: {
            MuiButtonBase: {
                disableRipple: true
            },

            MuiPopover: {
                elevation: 1,
            },
        },
    }
);

export default function ThemeProvider(props) {
    const { children } = props;

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
