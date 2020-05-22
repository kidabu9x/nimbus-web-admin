import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import {
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {
    rootStyles
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
                    <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
            {
                hasChild && (
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

const navItems = [
    {
        title: "Trang chủ",
        link: "/",
        children: []
    },
    {
        title: "Blogs",
        link: "/blogs",
        children: [
            {
                title: "Danh sách blogs",
                link: "/blogs"
            },
            {
                title: "Danh mục",
                link: "/blogs/danh-muc"
            }
        ]
    }
];

export default function Drawer({ open, toggleDrawer }) {
    const classes = rootStyles();
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
            <MemoryRouter initialEntries={[navItems[0].link]} initialIndex={0}>
                <List>
                    {navItems.map(item => (
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
