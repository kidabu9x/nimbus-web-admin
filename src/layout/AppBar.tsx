import React, { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: 1
  }
});

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
  return (
    <MenuItemLink
      ref={ref}
      to="/configuration"
      primaryText={"Configuration"}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props: any) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      NIMBUS ADMIN
      <span className={classes.spacer} />
    </AppBar>
  );
};

export default CustomAppBar;
