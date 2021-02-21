import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getBlogs, deleteBlog } from "../../../store/blogs/actions";
import { getCategories } from "../../../store/categories/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TablePagination,
  InputBase,
  FormControl,
  Select,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import useStyles from "./styles";
import { ROUTES } from "../../../router/Routes";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";
import SearchIcon from "@material-ui/icons/Search";
import { find } from "lodash";
import EmptyList from "../../../components/EmptyList/EmptyList";

const BlogsList = () => {
  const {
    blogs,
    pagination,
    requesting,
    reload,
    categories
  } = useSelector((
    { blogs, categories }) => ({
      blogs: blogs.blogs,
      pagination: blogs.pagination,
      filter: blogs.filter,
      requesting: blogs.requesting,
      reload: blogs.reload,
      categories: categories.categories
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [blogEdit, setBlogEdit] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const [stringEmpty, setStringEmpty] = useState("");

  useEffect(() => {
    dispatch(getBlogs({
      searchTerm,
      categoryId,
      page,
      limit
    }));
  }, [page, categoryId, limit, searchTerm, reload, dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onEditBlog = (blog) => {
    history.push(`${ROUTES.blogs}/${blog.id}`);
  };

  const onConfirmDelete = () => {
    dispatch(deleteBlog({
      id: blogEdit.id
    }));
    setOpenModalDelete(false);
  };

  const onAddNew = () => {
    history.push(`${ROUTES.blogs}/new`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onOpenDeleteBlog = (blog) => {
    setBlogEdit(blog);
    setOpenModalDelete(true);
  };

  const blogStatusExchange = (status) => {
    if (status === "PUBLISHED") {
      return "Đã xuất bản";
    }
    return "Bản nháp";
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onSearch = () => {
    setSearchTerm(searchInput);
  };

  useEffect(() => {
    const getStringEmpty = (titleString, categoryString) => {
      let resultString = `Không tìm thấy blogs`;
      if (titleString !== "") {
        resultString = resultString + ` có từ khóa ${searchTerm}`;
      }
      if (categoryString !== null && categoryString !== "") {
        resultString =
          resultString +
          ` trong danh mục ${find(
            categories,
            (category) => category.id === parseInt(categoryString)
          ).title
          }`;
      }
      return resultString;
    };
    if (blogs.length === 0) {
      setStringEmpty(getStringEmpty(searchTerm, categoryId));
    } else {
      setStringEmpty("");
    }
  }, [blogs, searchTerm, categoryId, categories]);

  return (
    <>
      <div className={classes.header}>
        <Paper
          component="form"
          className={classes.search}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl className={classes.searchFormControl}>
            <InputBase
              className={classes.searchInput}
              defaultValue={searchInput}
              onChange={onChangeSearchInput}
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              disabled={requesting}
            />
            <IconButton
              type="submit"
              className={classes.searchButton}
              aria-label="search"
              onClick={() => {
                onSearch();
              }}
              disabled={requesting}
            >
              <SearchIcon />
            </IconButton>
          </FormControl>
          <Divider className={classes.divider} orientation="vertical" />
          <FormControl className={classes.selectFormControl}>
            <Select
              native
              id="controlled-open-select"
              value={categoryId}
              onChange={(evt) => {
                handleCategoryChange(evt);
              }}
              inputProps={{
                id: "controlled-open-select",
              }}
              className={classes.selectCategory}
              disabled={requesting}
            >
              <option value="" disabled>
                Danh mục
              </option>
              <option aria-label="None" value={null} />
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddNew}
            disabled={requesting}
          >
            Thêm mới blog
          </Button>
        </div>
      </div>
      <div className="kt-space-20" />
      <Paper className={classes.root}>
        <Table className={`${classes.table}`} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell>
                Ngày tạo
              </TableCell>
              <TableCell>
                Tiêu đề
              </TableCell>
              <TableCell>
                Trạng thái
              </TableCell>
              <TableCell align="right">
                Tác động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    {dayjs(blog.created_at * 1000).format("DD/MM/YY")}
                  </TableCell>
                  <TableCell component="th" scope="blog">
                    {blog.title}
                  </TableCell>
                  <TableCell>
                    {blogStatusExchange(blog.status)}
                  </TableCell>
                  <TableCell align="right">
                    <div className={classes.actions}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => {
                          onEditBlog(blog);
                        }}
                        disabled={requesting}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => {
                          onOpenDeleteBlog(blog);
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
        {blogs.length === 0 && <EmptyList title={stringEmpty} />}
        <TablePagination
          rowsPerPageOptions={[limit]}
          component="div"
          count={pagination.total}
          rowsPerPage={limit}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
      <ConfirmDelete
        message="Bạn có chắc chắn muốn xóa blog này?"
        title="Xác nhận xóa"
        open={openModalDelete}
        onSubmit={onConfirmDelete}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </>
  );
};

export default BlogsList;
