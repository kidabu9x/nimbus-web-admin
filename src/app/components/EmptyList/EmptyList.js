import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const EmptyList = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>{title}</Typography>
    </div>
  );
};

EmptyList.propTypes = {
  title: PropTypes.any,
};

EmptyList.defaultProps = {
  title: "",
};

export default EmptyList;
