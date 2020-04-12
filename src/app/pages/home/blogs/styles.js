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
    alignItems: "center",
    display: "flex"
  },
  rowHeader: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between"
  },
  textField: {
    marginRight: 20
  },
  editorContainer: {
    marginBottom: 20,
    paddingBottom: 20
  },
  btnHeader: {
    marginLeft: 15
  },
  inputTitle: {
    width: "50%"
  },
  inputDescription: {
    width: "100%"
  }
}));

export default useStyles;
