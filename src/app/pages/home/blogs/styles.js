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
  cardContainerLeft: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 20
  },
  cardContainerRight: {
    marginBottom: 20,
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
    marginLeft: 8,
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
    width: "65%"
  },
  inputDescription: {
    width: "100%"
  },
  ckeContainer: {
    display: "flex",
    flexDirection: "column"
  },
  btnRemoveCKE: {
    width: 40,
    left: "95%"
  },
  ckeField: {
    display: "flex"
  },
  categoriesContainer: {
    width: "100%"
  },
  categoryTag: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20
  },
  categoryTagBtn: { float: "right" },
  statusContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0
  }
}));

export default useStyles;
