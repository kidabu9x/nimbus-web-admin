import { makeStyles } from "@material-ui/styles";

export const Colors = {
  lightRed: "#FF7357"
};

const useColors = makeStyles(theme => ({
  lightRed: {
    backgroundColor: Colors.lightRed
  }
}));

export default useColors;
