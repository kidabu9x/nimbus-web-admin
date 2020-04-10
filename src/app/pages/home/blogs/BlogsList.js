import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as blog from "../../../store/blog";
import { getAllBlogs } from "../../../crud/blog.crud";
import PropTypes from "prop-types";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  actions: {
    display: "flex",
  },
}));

const BlogsList = ({ getBlogsSuccess, blogs }) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getAllBlogs().then((data) => {
      getBlogsSuccess(data.data);
    });
  }, []);

  const onEditBlog = (blog) => {
    console.log("====================================");
    console.log(blog);
    console.log("====================================");
    history.push(`/blogs/edit/${blog.id}`, { blog });
  };

  const onDeleteBlog = (blog) => {
    console.log("onDeleteBlog");
    console.log(blog);
    console.log("====================================");
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-6">
          <div className="row row-full-height">
            <div className="kt-space-20" />
            <Paper className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Create At</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell align="right">Body</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell align="right">{blog.id}</TableCell>
                      <TableCell align="right">{blog.createdAt}</TableCell>
                      <TableCell component="th" scope="blog">
                        {blog.title}
                      </TableCell>
                      <TableCell align="right">{blog.author}</TableCell>
                      <TableCell align="right">{blog.body}</TableCell>
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
                              onDeleteBlog(blog);
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
  getBlogsSuccess: PropTypes.func.isRequired,
};
BlogsList.defaultProps = {};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogsList,
});

const mapDispatchToProps = {
  getBlogsSuccess: blog.actions.getBlogsSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsList);
