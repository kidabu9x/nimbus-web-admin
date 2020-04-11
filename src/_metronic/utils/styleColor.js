import { makeStyles } from "@material-ui/styles";

export const Colors = {
  lightRed: "#e43433"
};

const useColors = makeStyles(theme => ({
  lightRed: {
    backgroundColor: Colors.lightRed
  }
}));

export default useColors;
