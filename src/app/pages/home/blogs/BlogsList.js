import React, { useEffect } from "react";
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

const BlogsList = ({
  getBlogsSuccess,
  blogs,
  totalBlog,
  pagination,
  getPage,
}) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    getAllBlogs().then((res) => {
      getBlogsSuccess({ data: res.data.data, meta: res.data.meta });
    });
  };

  const onEditBlog = (blog) => {
    history.push(`${ROUTES.blogs}/${blog.id}`);
  };

  const onDeleteBlog = (blogId) => {
    deleteBlog(blogId).then((data) => {
      loadBlogs();
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

  const handleChangeRowsPerPage = (event) => {
    console.log("handleChangeRowsPerPage");
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row row-full-height">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={onAddNew}
            >
              <FormattedMessage id="BLOGS.LIST.ADD_NEW" />
            </Button>
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
                        <TableCell align="right">{blog.status}</TableCell>
                        <TableCell>
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
                                onDeleteBlog(blog.id);
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
});

const mapDispatchToProps = {
  getBlogsSuccess: blog.actions.getBlogsSuccess,
  getPage: blog.actions.getPageBlog,
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BlogsList)
);
