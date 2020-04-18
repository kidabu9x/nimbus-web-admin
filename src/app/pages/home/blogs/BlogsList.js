import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as blog from "../../../store/blog";
import { getAllBlogs, deleteBlog } from "../../../crud/blog.crud";
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
  MenuItem,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import { FormattedMessage, injectIntl } from "react-intl";
import { ROUTES } from "../../../../_metronic/utils/routerList";
import { ROWS_PER_PAGE } from "../../../../_metronic/utils/constants";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";
import * as category from "../../../store/category";
import SearchIcon from "@material-ui/icons/Search";
import { getAllCategories } from "../../../crud/category.crud";
import { find } from "lodash";
import EmptyList from "../../../components/EmptyList/EmptyList";

const BlogsList = ({
  getBlogsSuccess,
  blogs,
  totalBlog,
  pagination,
  getPage,
  getCategoriesSuccess,
  categories,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [blogEdit, setBlogEdit] = useState(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [openSelectSearch, setOpenSelectSearch] = useState(false);
  const [stringEmpty, setStringEmpty] = useState("");

  useEffect(() => {
    const loadBlogs = () => {
      getAllBlogs().then((res) => {
        getBlogsSuccess({ data: res.data.data, meta: res.data.meta });
      });
    };
    const loadCategories = () => {
      getAllCategories().then((res) => {
        getCategoriesSuccess(res.data.data);
      });
    };
    loadCategories();
    loadBlogs();
  }, [getBlogsSuccess, getCategoriesSuccess]);

  const onEditBlog = (blog) => {
    history.push(`${ROUTES.blogs}/${blog.id}`);
  };

  const onDeleteBlog = () => {
    deleteBlog(blogEdit.id).then((data) => {
      setOpenModalDelete(false);
      // loadBlogs();
    });
  };

  const onAddNew = () => {
    history.push(`${ROUTES.blogs}/new`);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage > pagination.page && totalBlog > blogs.length) {
      getAllBlogs(newPage).then((res) => {
        getBlogsSuccess({ data: res.data.data, meta: res.data.meta });
      });
    } else {
      getPage(newPage);
    }
  };

  const onOpenDeleteBlog = (blog) => {
    setBlogEdit(blog);
    setOpenModalDelete(true);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handleChangeRowsPerPage");
  };

  const blogStatusExchange = (status) => {
    if (status === "PUBLISHED") {
      return "Đã xuất bản";
    }
    return "Bản nháp";
  };

  const handleChangeSelect = (event) => {
    setCategorySearch(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpenSelectSearch(false);
  };

  const handleOpenSelect = () => {
    setOpenSelectSearch(true);
  };

  const onChangeSearchInput = (event) => {
    setTitleSearch(event.target.value);
  };

  const onSearch = () => {
    getAllBlogs(0, titleSearch, categorySearch).then((res) => {
      const resBlogs = res.data.data;
      const meta = res.data.meta;
      getBlogsSuccess({ data: resBlogs, meta });
      if (resBlogs.length === 0) {
        setStringEmpty(getStringEmpty(titleSearch, categorySearch));
      }
    });
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
      <div className="row">
        <div className="col-xl-12">
          <div className={classes.container}>
            <div className={classes.header}>
              <div className={classes.search}>
                <div className={classes.searchField}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChangeSearchInput}
                  />
                  <Typography>
                    <FormattedMessage id="BLOGS.EDIT.CATEGORIES"></FormattedMessage>
                    :
                  </Typography>
                  <FormControl className={classes.formSearchControl}>
                    <Select
                      variant="outlined"
                      id="controlled-open-select"
                      open={openSelectSearch}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={categorySearch}
                      onChange={handleChangeSelect}
                      className={classes.selectField}
                    >
                      <MenuItem value={null}>&ensp;</MenuItem>
                      {categories.map((category) => (
                        <MenuItem value={category.id} key={category.id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btnSearch}
                    startIcon={<SearchIcon />}
                    onClick={() => {
                      onSearch();
                    }}
                  >
                    <FormattedMessage id="BLOGS.LIST.SEARCH" />
                  </Button>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={onAddNew}
              >
                <FormattedMessage id="BLOGS.LIST.ADD_NEW" />
              </Button>
            </div>
            <div className="kt-space-20" />
            <Paper className={classes.root}>
              <Table className={`${classes.table}`} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="BLOGS.LIST.TABLE.CREATE_AT" />
                    </TableCell>
                    <TableCell align="left">
                      <FormattedMessage id="BLOGS.LIST.TABLE.TITLE" />
                    </TableCell>
                    <TableCell align="left">
                      <FormattedMessage id="BLOGS.LIST.TABLE.DESCRIPTION" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="BLOGS.LIST.TABLE.STATUS" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="BLOGS.LIST.TABLE.ACTIONS" />
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
                        <TableCell align="left">{blog.description}</TableCell>
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
                rowsPerPageOptions={[ROWS_PER_PAGE]}
                component="div"
                count={totalBlog}
                rowsPerPage={ROWS_PER_PAGE}
                page={pagination.page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
      <ConfirmDelete
        message={<FormattedMessage id="BLOGS.LIST.MODAL_DELETE.DESCRIPTION" />}
        title={<FormattedMessage id="BLOGS.LIST.MODAL_DELETE.TITLE" />}
        open={openModalDelete}
        onSubmit={onDeleteBlog}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </>
  );
};

BlogsList.propTypes = {
  getBlogsSuccess: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  totalBlog: PropTypes.number,
  pagination: PropTypes.shape({}),
};
BlogsList.defaultProps = {
  blog: [],
  totalBlog: 0,
  pagination: {
    page: 0,
    limit: ROWS_PER_PAGE,
    offset: 0,
  },
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogsList,
  totalBlog: state.blog.total,
  pagination: state.blog.pagination,
  categories: state.category.categoriesList,
});

const mapDispatchToProps = {
  getBlogsSuccess: blog.actions.getBlogsSuccess,
  getPage: blog.actions.getPageBlog,
  getCategoriesSuccess: category.actions.getCategoriesSuccess,
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BlogsList)
);
