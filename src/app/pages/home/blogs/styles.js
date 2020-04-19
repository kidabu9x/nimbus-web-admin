import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
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
    width: "100%",
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
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  formSearchControl: {
    minWidth: 120,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 20,
  },
  searchField: {
    display: "flex",
    alignItems: "center",
  },
  btnSearch: {
    marginLeft: 20,
    paddingLeft: 20,
  },
  titleSearch: {
    paddingLeft: 15,
  },
  selectField: {
    marginTop: 0,
    marginBottom: 0
  },
  thumbnail: {
    width: "100%",
  },
}));

export default useStyles;
