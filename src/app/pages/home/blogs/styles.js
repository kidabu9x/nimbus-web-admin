import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  container: {
    display: "flex",
  },
  table: {
    minWidth: 650,
  },
  cardTitle: {
    color: "#646c9a",
    fontSize: 17,
    fontWeight: 500,
  },
  cardContainerLeft: {
    marginBottom: 20,
    marginRight: 10,
  },
  containerRight: {
    marginBottom: 10,
    width: "100%",
  },
  cardContainerRight: {
    marginBottom: 10,
  },
  actions: {
    display: "flex",
    float: "right",
  },
  btnAdd: {
    marginLeft: 12,
  },
  rowBody: {
    marginBottom: 12,
    alignItems: "center",
    display: "flex",
  },
  rowHeader: {
    margin: theme.spacing(2, 0),
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  rowFootHeader: {
    margin: theme.spacing(2.5, 1.5, 0, 0),
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  btnHeader: {
    marginLeft: 15,
  },
  btnFooter: {
    marginLeft: 0,
  },
  inputFullWidth: {
    width: "100%"
  },

  btnRemoveCKE: {
    width: 40,
    left: "95%",
  },
  ckeField: {
    display: "flex",
  },
  categoriesContainer: {
    width: "100%",
  },
  categoryTag: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 20,
  },
  categoryTagBtn: { float: "right" },
  statusContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0,
  },
  listDeleteBtn: {
    color: "#D1E2E8",
  },
}));

export default useStyles;
