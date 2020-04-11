import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  container: {},
  table: {
    minWidth: 650
  },
  cardContainer: {
    marginBottom: 20
  },
  actions: {
    display: "flex"
  },
  btnAdd: {
    marginLeft: 12
  },
  rowBody: {
    marginBottom: 12,
    alignItems: "center"
  },
  rowHeader: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between"
  },
  textField: {
    marginRight: 20
  }
}));

export default useStyles;
