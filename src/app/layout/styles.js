import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

export const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}), { index: 1 });

export const drawerStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}), { index: 1 });

export const appBarStyle = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgb(28, 34, 96)",
        color: "white"
    },
    title: {
        flexGrow: 1
    }
}), { index: 1 });