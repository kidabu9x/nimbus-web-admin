import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import useStyles from "./styles";

const initCategory = {
  title: "OK DUONG NHA"
};

const CategoryEdit = ({ open, setOpen, category, onSubmit }) => {
  const classes = useStyles();
  const [value, setValue] = useState(
    category !== null ? category.title : initCategory.title
  );

  useEffect(() => {
    if (category !== null) {
      setValue(category.title);
    } else {
      setValue(initCategory.title);
    }
  }, [category]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const newCategory = {
      ...category,
      title: value
    };
    onSubmit(newCategory);
  };

  const onChangeTitle = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modal}
      >
        <>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Change Title of{" "}
            {category !== null ? category.title : initCategory.title}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              value={value}
              onChange={onChangeTitle}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleSubmit} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </div>
  );
};

CategoryEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  category: PropTypes.shape({}),
  onSubmit: PropTypes.func
};

CategoryEdit.defaultProps = {
  open: false,
  setOpen: () => {},
  category: null,
  onSubmit: () => {}
};

export default CategoryEdit;
