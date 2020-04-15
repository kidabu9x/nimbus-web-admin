import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  container: {},
  modal: {
    minWidth: 650
  },
  listDeleteBtn: {
    color: "#D1E2E8"
  }
}));

export default useStyles;
