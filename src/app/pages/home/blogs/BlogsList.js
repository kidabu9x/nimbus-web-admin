import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getBlogs } from "../../../store/blogs/actions";
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
import {
  ROWS_PER_PAGE
} from "../../../constants";

const BlogsList = () => {
  const categories = [];
  const {
    blogs,
    pagination
  } = useSelector((
    { blogs }) => ({
      blogs: blogs.blogs,
      pagination: blogs.pagination
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [blogEdit, setBlogEdit] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [titleSearch, setTitleSearch] = useState(null);
  const [stringEmpty, setStringEmpty] = useState("");

  useEffect(() => {
    dispatch(getBlogs({
      searchTerm: titleSearch,
      categoryId: categoryId,
      page: pagination.page
    }));
  }, []);

  const onEditBlog = (blog) => {
    history.push(`${ROUTES.blogs}/${blog.id}`);
  };

  const onDeleteBlog = () => {
    // deleteBlog(blogEdit.id).then((data) => {
    //   setOpenModalDelete(false);
    //   onSearch();
    // });
  };

  const onAddNew = () => {
    history.push(`${ROUTES.blogs}/new`);
  };

  const handleChangePage = (event, newPage) => {
    // if (newPage > pagination.page && totalBlog > blogs.length) {
    //   getAllBlogs(newPage).then((res) => {
    //     getBlogsSuccess({ data: res.data.data, meta: res.data.meta });
    //   });
    // } else {
    //   getPage(newPage);
    // }
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
    setTitleSearch(event.target.value);
  };

  const onSearch = () => {
    // getAllBlogs(0, titleSearch, categorySearch).then((res) => {
    //   const resBlogs = res.data.data;
    //   const meta = res.data.meta;
    //   getBlogsSuccess({ data: resBlogs, meta });
    //   if (resBlogs.length === 0) {
    //     setStringEmpty(getStringEmpty(titleSearch, categorySearch));
    //   }
    // });
  };

  const getStringEmpty = (titleString, categoryString) => {
    let resultString = `Không tìm thấy blogs`;
    if (titleString !== "") {
      resultString = resultString + ` có từ khóa ${titleSearch}`;
    }
    if (categoryString !== null && categoryString !== "") {
      resultString =
        resultString +
        ` trong danh mục ${
        find(
          categories,
          (category) => category.id === parseInt(categoryString)
        ).title
        }`;
    }
    return resultString;
  };

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
              onChange={onChangeSearchInput}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              className={classes.searchButton}
              aria-label="search"
              onClick={() => {
                onSearch();
              }}
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
          <Button variant="contained" color="primary" onClick={onAddNew}>
            Thêm mới blog
          </Button>
        </div>
      </div>
      <div className="kt-space-20" />
      <Paper className={classes.root}>
        <Table className={`${classes.table}`} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">
                Ngày tạo
              </TableCell>
              <TableCell align="right">
                Tiêu đề
              </TableCell>
              <TableCell align="right">
                Trạng thái
              </TableCell>
              <TableCell align="right">
                Tác động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .slice(
                pagination.page * ROWS_PER_PAGE,
                pagination.page * ROWS_PER_PAGE + ROWS_PER_PAGE
              )
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell align="right">{blog.id}</TableCell>
                  <TableCell align="right">
                    {dayjs(blog.created_at).format("DD/MM/YY")}
                  </TableCell>
                  <TableCell component="th" scope="blog" align="left">
                    {blog.title}
                  </TableCell>
                  <TableCell align="right">
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
          rowsPerPageOptions={[pagination.limit]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.limit}
          page={pagination.offset}
          onChangePage={handleChangePage}
        />
      </Paper>
      <ConfirmDelete
        message="Bạn có chắc chắn muốn xóa blog này?"
        title="Xác nhận xóa"
        open={openModalDelete}
        onSubmit={onDeleteBlog}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </>
  );
};

export default BlogsList;
