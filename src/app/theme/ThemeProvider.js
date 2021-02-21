import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { common } from "@material-ui/core/colors";

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: "#207347",
                contrastText: common.white
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
