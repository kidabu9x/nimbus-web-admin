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
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import {
    drawerStyles
} from "./styles";

const customItemStyles = makeStyles(theme => ({
    childItem: {
        paddingLeft: theme.spacing(8)
    }
}))

const ListItemLink = (props) => {
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

const Icon = ({ link }) => {
    switch (link) {
        case "/":
            return <HomeIcon />
        case "/blogs":
            return <QuestionAnswerIcon />
        default:
            return null;
    }
}

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
    const hasChild = () => {
        return children && Array.isArray(children) && children.length > 0;
    }
    return (
        <>
            <ListItem button onClick={toggleOpen}>
                <ListItemIcon>
                    <Icon link={link} />
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
            {
                children && hasChild && (
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
                )
            }
        </>
    )
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
                {NAV_ITEMS.map(item => (
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
