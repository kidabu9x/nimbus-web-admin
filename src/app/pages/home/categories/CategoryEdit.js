import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import { FormattedMessage } from "react-intl";

const initCategory = {
  title: "",
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
      title: value,
    };
    onSubmit(newCategory);
  };

  const onChangeTitle = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {category !== null ? (
            <FormattedMessage id="CATEGORIES.EDIT.TITLE_EDIT" />
          ) : (
            <FormattedMessage id="CATEGORIES.EDIT.TITLE_ADD" />
          )}
        </DialogTitle>
        <DialogContent dividers className={classes.modalContent}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            value={value}
            onChange={onChangeTitle}
            placeholder="Nhập danh mục..."
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSubmit}
            disabled={!value.length}
            color="primary"
          >
            <FormattedMessage id="CATEGORIES.EDIT.SAVE"></FormattedMessage>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CategoryEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  category: PropTypes.shape({}),
  onSubmit: PropTypes.func,
};

CategoryEdit.defaultProps = {
  open: false,
  setOpen: () => {},
  category: null,
  onSubmit: () => {},
};

export default CategoryEdit;
