import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    },
    header: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex"
    },
    headerAction: {
        textTransform: "none"
    },
    content: {
        padding: theme.spacing(2)
    }
}));

export default useStyles;
