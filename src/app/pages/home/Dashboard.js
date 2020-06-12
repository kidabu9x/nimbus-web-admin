import React from "react";
import {
  Container
} from "@material-ui/core";
import NavigationPanel from "../../components/Ui/NavigationPanel";
import { NAV_ITEMS } from "../../router/Routes";

export default function Dashboard() {
  const navItems = NAV_ITEMS.filter(item => !item.ignoreInPanel);
  return (
    <Container>
      <NavigationPanel navItems={navItems} />
    </Container>
  );
}
