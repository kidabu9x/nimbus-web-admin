import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  container: {
    display: "flex"
  },
  table: {
    minWidth: 650
  },
  cardTitle: {
    color: '#646c9a',
    fontSize: 17,
    fontWeight: 500
  },
  cardContainerLeft: {
    marginBottom: 20,
    marginRight: 10
  },
  containerRight: {
    marginBottom: 10,
    width: "100%"
  },
  cardContainerRight: {
    marginBottom: 10
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
    marginRight: 0,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex"
  },
  rowFootHeader: {
    marginBottom: 12,
    marginLeft: 0,
    marginRight: 0,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex"
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
  btnFooter: {
    marginLeft: 0
  },
  inputTitle: {
    width: "100%"
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
    marginTop: 15,
    marginLeft: 20
  },
  categoryTagBtn: { float: "right" },
  statusContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0
  },
  listDeleteBtn: {
    color: "#5d78ff"
  }
}));

export default useStyles;
