import React from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDelete = ({ open, setOpen, onSubmit, message, title }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className={classes.container}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="BLOGS.LIST.MODAL_DELETE.NO" />
          </Button>
          <Button onClick={handleSubmit} color="default">
            <FormattedMessage id="BLOGS.LIST.MODAL_DELETE.YES" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDelete.propTypes = {
  message: PropTypes.any,
  title: PropTypes.any,
};

ConfirmDelete.defaultProps = {
  open: false,
  setOpen: () => {},
  onSubmit: () => {},
  message: "",
  title: "",
};

export default ConfirmDelete;
