import { makeStyles } from "@material-ui/styles";

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
  thumbnail: {
    width: "100%",
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 600,
    width: 500
  },
  searchFormControl: {
    display: "flex",
    flex: 1,
    flexDirection: "inherit"
  },
  searchButton: {
    marginLeft: theme.spacing(1),
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  divider: {
    height: 28,
    margin: 4,
  },
  selectFormControl: {
    padding: 10
  },
  selectCategory: {
    "&::before": {
      display: "none"
    }
  }
}));

export default useStyles;
