import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as category from "../../../store/category";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
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
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import CategoryEdit from "./CategoryEdit";
import { FormattedMessage } from "react-intl";
import { useSnackbar } from "notistack";
import { ERR_CODE } from "../../../../_metronic/utils/errCode";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";

const CategoriesList = ({ getCategoriesSuccess, categories }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getAllCategories().then((res) => {
      getCategoriesSuccess(res.data.data);
    });
  };

  const onEditCategory = (category) => {
    setCategoryEdit(category);
    setOpenModalEdit(true);
  };

  const onDeleteCategory = () => {
    deleteCategory(categoryEdit.id).then((data) => {
      setOpenModalDelete(false);
      loadCategories();
    });
  };

  const onOpenDeleteCategory = (category) => {
    setCategoryEdit(category);
    setOpenModalDelete(true);
  };

  const onAddNew = () => {
    setCategoryEdit(null);
    setOpenModalEdit(true);
  };

  const onSubmitCategory = (category) => {
    if (category.id) {
      updateCategory(category.id, category).then((data) => {
        setOpenModalEdit(false);
        loadCategories();
      });
    } else {
      createCategory(category)
        .then((data) => {
          setOpenModalEdit(false);
          setCategoryEdit(null);
          loadCategories();
        })
        .catch(({ response }) => {
          const data = response.data;
          enqueueSnackbar(ERR_CODE[data.meta.code], { variant: "error" });
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
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={onAddNew}
            >
              <FormattedMessage id="CATEGORIES.LIST.ADD_NEW" />
            </Button>
            <div className="kt-space-20" />
            <Paper className={classes.root}>
              <Table
                className={`col-xl-12 ${classes.table}`}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="CATEGORIES.LIST.TABLE.ID" />
                    </TableCell>
                    <TableCell align="left">
                      <FormattedMessage id="CATEGORIES.LIST.TABLE.TITLE" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="CATEGORIES.LIST.TABLE.ACTIONS" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell align="left">{category.id}</TableCell>
                      <TableCell component="th" scope="category" align="left">
                        {category.title}
                      </TableCell>
                      <TableCell align="right">
                        <div className={classes.actions}>
                          <IconButton
                            aria-label="edit"
                            color="primary"
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
                              onOpenDeleteCategory(category);
                            }}
                            className={classes.listDeleteBtn}
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
        </div>
      </div>
      <CategoryEdit
        open={openModalEdit}
        setOpen={(value) => {
          setOpenModalEdit(value);
        }}
        category={categoryEdit}
        onSubmit={onSubmitCategory}
      />
      <ConfirmDelete
        message={`Bạn có chắc chắn muốn xóa danh mục "${categoryEdit !== null &&
          categoryEdit.title}"`}
        title={<FormattedMessage id="CATEGORIES.LIST.MODAL_DELETE.TITLE" />}
        open={openModalDelete}
        onSubmit={onDeleteCategory}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </>
  );
};

CategoriesList.propTypes = {
  getCategoriesSuccess: PropTypes.func.isRequired,
};
CategoriesList.defaultProps = {
  categories: [],
};

const mapStateToProps = (state) => ({
  categories: state.category.categoriesList,
});

const mapDispatchToProps = {
  getCategoriesSuccess: category.actions.getCategoriesSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
