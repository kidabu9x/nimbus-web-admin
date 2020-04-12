import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getBlog,
  updateBlog,
  createBlog,
  deleteBlog
} from "../../../crud/blog.crud";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Input,
  Fab,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button
} from "@material-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";
import { BLOG } from "../../../../_metronic/utils/constants";
import useColors from "../../../../_metronic/utils/styleColor";
import { remove } from "lodash";
import { ROUTES } from "../../../../_metronic/utils/routerList";

const initCKEContent = {
  content: "string",
  type: "<h1>New content</h1>"
};
const initAuthor = {
  id: "string",
  email: "string",
  first_name: "string",
  last_name: "string",
  avatar: "https://i.stack.imgur.com/34AD2.jpg"
};

const initDefaultBlog = {
  id: "string",
  title: "string",
  contents: [
    {
      content: "string",
      type: "HTML" // HTML
    }
  ],
  tags: ["string"],
  status: "string", // DELETED, PUBLISHED, DISABLED
  created_at: "string",
  updated_at: "string",
  authors: [
    {
      email: "string",
      first_name: "string",
      last_name: "string",
      avatar: "string"
    },
    {
      email: "string",
      first_name: "string",
      last_name: "string",
      avatar: "string"
    }
  ]
};

const BlogEdit = ({ blogData }) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const colors = useColors();
  const [blog, setBlog] = useState(blogData[id]);

  useEffect(() => {
    if (id !== BLOG.QUERY_NEW) {
      getBlog(id).then(res => {
        setBlog(res.data.data);
      });
    } else {
      setBlog(initDefaultBlog);
    }
  }, []);

  const onAddCKE = () => {
    const newContents = blog.contents;
    newContents[newContents.length] = initCKEContent;
    setBlog({ ...blog, contents: newContents });
  };

  const handleAddChip = chip => {
    let newTags = blog.tags;
    newTags[newTags.length] = chip;
    setBlog({ ...blog, tags: newTags });
  };

  const handleDeleteChip = (chip, index) => {
    let newTags = blog.tags;
    newTags = remove(newTags, tag => tag !== chip);
    setBlog({ ...blog, tags: newTags });
  };

  const onChangeStatus = event => {
    setBlog({ ...blog, status: event.target.value });
  };

  const onAddAuthor = () => {
    const newAuthors = blog.authors;
    newAuthors[newAuthors.length] = initAuthor;
    setBlog({ ...blog, authors: newAuthors });
  };

  const onSubmit = () => {
    if (id !== BLOG.QUERY_NEW) {
      updateBlog(id, blog).then(data => {
        history.push(ROUTES.blogs);
      });
    } else {
      createBlog(blog).then(data => {
        history.push(ROUTES.blogs);
      });
    }
  };

  const onClear = () => {
    history.push(`${ROUTES.blogs}`);
  };

  const onDelete = () => {
    deleteBlog(blog.id).then(data => {
      history.push(`${ROUTES.blogs}`);
    });
  };

  const onTitleChange = event => {
    setBlog({ ...blog, title: event.target.value });
  };

  const onDescChange = event => {
    setBlog({ ...blog, description: event.target.value });
  };

  const onContentChange = (index, content, data) => {
    const newContents = blog.contents;
    let newContent = blog.contents[index];
    newContent = { ...content, content: data, type: "HTML" };
    newContents[index] = newContent;
    setBlog({ ...blog, contents: newContents });
  };

  const onChangeAuthor = (event, author, index, key) => {
    const newAuthors = blog.authors;
    let newAuthor = newAuthors[index];
    newAuthor[key] = event.target.value;
    newAuthors[index] = newAuthor;
    setBlog({ ...blog, authors: newAuthors });
  };

  return (
    <>
      <div className={`row ${classes.rowHeader}`}>
        <Typography variant="h3">
          {id !== BLOG.QUERY_NEW ? "Edit" : "New"}
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.btnHeader}
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Submit
          </Button>
          {id !== BLOG.QUERY_NEW && (
            <Button
              variant="contained"
              color="secondary"
              className={`${classes.btnHeader} ${colors.lightRed}`}
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
          <Button
            variant="contained"
            color="inherit"
            className={classes.btnHeader}
            startIcon={<ClearIcon />}
            onClick={onClear}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className={`${classes.container}`}>
        {blog && (
          <>
            <Card className={`col-xl-9 ${classes.cardContainer}`}>
              <CardContent>
                <Typography>Title</Typography>
                <div className="kt-space-20" />
                <Input
                  className={classes.inputTitle}
                  value={blog.title}
                  onChange={onTitleChange}
                ></Input>
              </CardContent>
              <CardContent>
                <Typography>Description</Typography>
                <div className="kt-space-20" />
                <Input
                  className={classes.inputDescription}
                  value={blog.description}
                  onChange={onDescChange}
                ></Input>
              </CardContent>
              <CardContent>
                <div className={`${classes.rowBody}`}>
                  <Typography>Body</Typography>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={onAddCKE}
                    className={classes.btnAdd}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                {blog.contents.map((content, index) => (
                  <div key={index}>
                    <CKEditor
                      key={index}
                      editor={ClassicEditor}
                      data={content.content}
                      onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        onContentChange(index, content, data);
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                    />
                    <div className="kt-space-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className={`col-xl-9 ${classes.cardContainer}`}>
              <CardContent>
                <Typography>Tags</Typography>
                <div className="kt-space-20" />
                <ChipInput
                  value={blog.tags}
                  onAdd={chip => {
                    handleAddChip(chip);
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, index)}
                />
              </CardContent>
              <CardContent>
                <Typography>Status</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={blog.status}
                    onChange={onChangeStatus}
                    row
                  >
                    <FormControlLabel
                      value="DELETED"
                      control={<Radio color="primary" />}
                      label="DELETED"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="PUBLISHED"
                      control={<Radio color="primary" />}
                      label="PUBLISHED"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="DISABLED"
                      control={<Radio color="primary" />}
                      label="DISABLED"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
            {/* TODO: Authors
            <Card className={`col-xl-9 ${classes.cardContainer}`}>
              <CardContent>
                <div className={`row row-full-height ${classes.rowBody}`}>
                  <Typography>Authors</Typography>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={onAddAuthor}
                    className={classes.btnAdd}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                {blog.authors.map((author, index) => (
                  <div key={index} className={classes.rowBody}>
                    <TextField
                      className={classes.textField}
                      error={!`${author.first_name}`.length}
                      label="First Name"
                      onChange={event => {
                        onChangeAuthor(event, author, index, "first_name");
                      }}
                      defaultValue={`${author.first_name}`}
                    />
                    <TextField
                      className={classes.textField}
                      error={!`${author.last_name}`.length}
                      label="Last Name"
                      onChange={event => {
                        onChangeAuthor(event, author, index, "last_name");
                      }}
                      defaultValue={`${author.last_name}`}
                    />
                    <TextField
                      className={classes.textField}
                      error={!author.email.length}
                      label="Email"
                      defaultValue={author.email}
                      onChange={event => {
                        onChangeAuthor(event, author, index, "email");
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card> */}
          </>
        )}
      </div>
    </>
  );
};

BlogEdit.propTypes = {
  blogData: PropTypes.shape({})
};
BlogEdit.defaultProps = {};

const mapStateToProps = state => ({
  blogData: state.blog.blogData
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEdit);
