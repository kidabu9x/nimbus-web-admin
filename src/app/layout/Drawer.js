import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { NAV_ITEMS } from "../router/Routes";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Toolbar
} from '@material-ui/core';
import RouterIcon from "../router/RouterIcon";
import {
    drawerStyles
} from "./styles";

const customItemStyles = makeStyles(theme => ({
    childItem: {
        paddingLeft: theme.spacing(8)
    }
}))

const ListItemLink = (props) => {
    console.log(props);
    const { icon, primary, to } = props;
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <ListItem button component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
        </ListItem>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const CustomItem = ({
    title,
    link,
    children
}) => {
    const classes = customItemStyles();
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }

    if (Array.isArray(children) && children.length > 0) {
        return (
            <>
                <ListItem button onClick={toggleOpen}>
                    <ListItemIcon>
                        <RouterIcon link={link} />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>

                <List disablePadding>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {
                            children.map(item => (
                                <ListItemLink
                                    className={classes.childItem}
                                    key={item.link}
                                    to={item.link}
                                    primary={item.title}
                                />
                            ))
                        }
                    </Collapse>
                </List>
            </>
        )
    } else {
        return (
            <ListItemLink
                to={link}
                primary={title}
                icon={<RouterIcon link={link} />}
            />
        );
    }
}

export default function DrawerLeft() {
    const classes = drawerStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <List>
                {NAV_ITEMS.filter(item => {
                    return !item.disable;
                }).map(item => (
                    <CustomItem
                        key={item.link}
                        title={item.title}
                        link={item.link}
                        children={item.children}
                    />
                ))}
            </List>
        </Drawer>
    );
}
