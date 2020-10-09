import React from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress
} from "@material-ui/core";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDelete = ({ open, setOpen, onSubmit, message, title, requesting }) => {

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {requesting && <LinearProgress />}
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={requesting}>
          HỦY
          </Button>
        <Button onClick={handleSubmit} color="default" disabled={requesting}>
          XÓA
          </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDelete.propTypes = {
  message: PropTypes.any,
  title: PropTypes.any,
};

ConfirmDelete.defaultProps = {
  open: false,
  setOpen: () => { },
  onSubmit: () => { },
  message: "",
  title: "",
};

export default ConfirmDelete;
