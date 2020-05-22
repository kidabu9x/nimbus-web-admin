import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { NAV_ITEMS } from "../router/Routes";
import {
    Drawer,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,

} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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

const ListItemLink = ({ icon, primary, to }) => {
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
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List disablePadding>
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
                        </List>
                    </Collapse>
                )
            }
        </>
    )
}

export default function DrawerLeft({ open, toggleDrawer }) {
    const classes = drawerStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <MemoryRouter initialEntries={[NAV_ITEMS[0].link]} initialIndex={0}>
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
            </MemoryRouter>
        </Drawer>
    );
}
