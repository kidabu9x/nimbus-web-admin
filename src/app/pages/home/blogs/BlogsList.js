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
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import { ROUTES } from "../../../../_metronic/utils/routerList";

const BlogsList = ({ getBlogsSuccess, blogs }) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    getAllBlogs().then(res => {
      getBlogsSuccess(res.data.data);
    });
  };

  const onEditBlog = blog => {
    history.push(`${ROUTES.blogs}/${blog.id}`);
  };

  const onDeleteBlog = blogId => {
    deleteBlog(blogId).then(data => {
      loadBlogs();
    });
  };

  const onAddNew = () => {
    history.push(`${ROUTES.blogs}/new`);
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
                    <TableCell align="right">Create At</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map(blog => (
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
                            color="secondary"
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
    </>
  );
};

BlogsList.propTypes = {
  getBlogsSuccess: PropTypes.func.isRequired
};
BlogsList.defaultProps = {};

const mapStateToProps = state => ({
  blogs: state.blog.blogsList
});

const mapDispatchToProps = {
  getBlogsSuccess: blog.actions.getBlogsSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsList);
