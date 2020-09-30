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
  actions: {
    display: "flex",
    float: "right",
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
