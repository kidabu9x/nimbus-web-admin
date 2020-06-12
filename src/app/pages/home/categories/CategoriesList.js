import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from "../../../store/categories/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Container,
  Box,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import CategoryEdit from "./CategoryEdit";
import { useSnackbar } from "notistack";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";

const CategoriesList = () => {
  const {
    requesting,
    categories,
    errorMessage
  } = useSelector((
    { categories }) => ({
      requesting: categories.requesting,
      categories: categories.categories,
      errorMessage: categories.errorMessage
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, {
        variant: "error"
      });
    }
  }, [enqueueSnackbar, errorMessage]);

  const onEditCategory = (category) => {
    setCategoryEdit(category);
    setOpenModalEdit(true);
  };

  const onDeleteCategory = () => {
    dispatch(deleteCategory({
      id: categoryEdit.id
    }));
    setOpenModalDelete(false);
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
      dispatch(updateCategory({
        id: category.id,
        category: category
      }));
    } else {
      dispatch(createCategory(category));
    }
    setOpenModalEdit(false);
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          Danh sách danh mục
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={onAddNew}
          disabled={requesting}
        >
          Thêm mới danh mục
        </Button>
      </Box>

      <Paper className={classes.root}>
        <Table
          className={`col-xl-12 ${classes.table}`}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell align="left">
                Tiêu đề
                    </TableCell>
              <TableCell align="right">
                Tác động
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
                      disabled={requesting}
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
                      disabled={requesting}
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
        title="Xác nhận xóa"
        open={openModalDelete}
        onSubmit={onDeleteCategory}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </Container>
  );
};

export default CategoriesList;
