import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as category from "../../../store/category";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory
} from "../../../crud/category.crud";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import CategoryEdit from "./CategoryEdit";

const CategoriesList = ({ getCategoriesSuccess, categories }) => {
  const classes = useStyles();
  const history = useHistory();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getAllCategories().then(res => {
      getCategoriesSuccess(res.data.data);
    });
  };

  const onEditCategory = category => {
    setCategoryEdit(category);
    setOpenModalEdit(true);
  };

  const onDeleteCategory = categoryId => {
    deleteCategory(categoryId).then(data => {
      loadCategories();
    });
  };

  const onAddNew = () => {
    setCategoryEdit(null);
    setOpenModalEdit(true);
  };

  const onSubmitCategory = category => {
    if (category.id) {
      updateCategory(category.id, category).then(data => {
        setOpenModalEdit(false);
        loadCategories();
      });
    } else {
      createCategory(category).then(data => {
        setOpenModalEdit(false);
        loadCategories();
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-9">
          <div className="row row-full-height">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={onAddNew}
            >
              Add new
            </Button>
            <div className="kt-space-20" />
            <Paper className={classes.root}>
              <Table
                className={`col-xl-12 ${classes.table}`}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell align="left">{category.id}</TableCell>
                      <TableCell component="th" scope="category" align="left">
                        {category.title}
                      </TableCell>
                      <TableCell align="right">
                        <div className={classes.actions}>
                          <IconButton
                            aria-label="edit"
                            color="secondary"
                            onClick={() => {
                              onEditCategory(category);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => {
                              onDeleteCategory(category.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <CategoryEdit
            open={openModalEdit}
            setOpen={value => {
              setOpenModalEdit(value);
            }}
            category={categoryEdit}
            onSubmit={onSubmitCategory}
          />
        </div>
      </div>
    </>
  );
};

CategoriesList.propTypes = {
  getCategoriesSuccess: PropTypes.func.isRequired
};
CategoriesList.defaultProps = {};

const mapStateToProps = state => ({
  categories: state.category.categoriesList
});

const mapDispatchToProps = {
  getCategoriesSuccess: category.actions.getCategoriesSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
