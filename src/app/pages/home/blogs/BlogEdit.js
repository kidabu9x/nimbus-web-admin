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
  Button,
  IconButton,
  TextField,
  Switch
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
import { remove } from "lodash";
import { ROUTES } from "../../../../_metronic/utils/routerList";
import { injectIntl, FormattedMessage } from "react-intl";
import * as category from "../../../store/category";
import { getAllCategories } from "../../../crud/category.crud";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { keyBy, filter } from "lodash";
import {
  BLOG_STATUS,
  BLOG_EXTRA_DATA
} from "../../../../_metronic/utils/types";

const initCKEContent = {
  content: "Chèn nội dung",
  type: "HTML"
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
  title: "Tiêu đề mới",
  contents: [
    {
      content: "Chèn nội dung",
      type: "HTML" // HTML
    }
  ],
  tags: [],
  description: "Mô tả mới",
  status: "DISABLED", // DELETED, PUBLISHED, DISABLED
  created_at: new Date().toDateString(),
  updated_at: new Date().toDateString(),
  authors: [],
  categories: [],
  extra_data: {
    [BLOG_EXTRA_DATA.FB_PIXEL_ID]: "",
    [BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]: ""
  }
};

const BlogEdit = ({ blogData, categories, getCategoriesSuccess }) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [blog, setBlog] = useState(blogData[id]);

  useEffect(() => {
    if (id !== BLOG.QUERY_NEW) {
      getBlog(id).then(res => {
        setBlog(res.data.data);
      });
    } else {
      setBlog(initDefaultBlog);
    }
    loadCategories();
  }, []);

  const loadCategories = () => {
    getAllCategories().then(res => {
      getCategoriesSuccess(res.data.data);
    });
  };

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

  const onChangeStatus = value => {
    setBlog({ ...blog, status: value });
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

  const onRemoveCKE = index => {
    let newContents = blog.contents;
    newContents = newContents
      .slice(0, index)
      .concat(newContents.slice(index + 1, newContents.length));
    setBlog({ ...blog, contents: newContents });
  };

  const onChooseCategory = category => {
    let newCategories = blog.categories;
    newCategories[newCategories.length] = category;
    setBlog({ ...blog, categories: newCategories });
  };

  const onDeleteCategory = (category, index) => {
    let newCategories = blog.categories;
    newCategories = newCategories
      .slice(0, index)
      .concat(newCategories.slice(index + 1, newCategories.length));
    setBlog({ ...blog, categories: newCategories });
  };

  const filterCategoriesByArray = (arr, arrDif) => {
    let lookup = keyBy(arrDif, o => {
      return o.id ? o.id.toString() : "" + o.title;
    });
    // find all users where "user + age" exists in index, one loop, quick lookup. no nested loops
    let result = filter(arr, u => {
      return lookup[u.id ? u.id.toString() : "" + u.title] === undefined;
    });
    return result;
  };

  const onFBPixelIdChange = evt => {
    setBlog({
      ...blog,
      extra_data: {
        ...blog.extra_data,
        [BLOG_EXTRA_DATA.FB_PIXEL_ID]: evt.target.value
      }
    });
  };

  const onGAIdChange = evt => {
    setBlog({
      ...blog,
      extra_data: {
        ...blog.extra_data,
        [BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]: evt.target.value
      }
    });
  };

  const onChangeAuthor = (event, author, index, key) => {
    const newAuthors = blog.authors;
    let newAuthor = newAuthors[index];
    newAuthor[key] = event.target.value;
    newAuthors[index] = newAuthor;
    setBlog({ ...blog, authors: newAuthors });
  };

  const onAddAuthor = () => {
    const newAuthors = blog.authors;
    newAuthors[newAuthors.length] = initAuthor;
    setBlog({ ...blog, authors: newAuthors });
  };

  return (
    <>
      <div className={`${classes.rowHeader}`}>
        <Typography variant="h4">
          {id !== BLOG.QUERY_NEW ? (
            <FormattedMessage id="BLOGS.EDIT.EDIT" />
          ) : (
            <FormattedMessage id="BLOGS.EDIT.NEW" />
          )}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnHeader}
          startIcon={<SaveIcon />}
          onClick={onSubmit}
        >
          <FormattedMessage id="BLOGS.EDIT.SUBMIT" />
        </Button>
      </div>
      <div className={`${classes.container}`}>
        {blog && (
          <>
            <Card className={`col-xl-8 ${classes.cardContainerLeft}`}>
              <CardContent>
                <Typography className={classes.cardTitle}>
                  <FormattedMessage id="BLOGS.EDIT.TITLE" />
                </Typography>
                <div className="kt-space-20" />
                <Input
                  className={classes.inputTitle}
                  value={blog.title}
                  onChange={onTitleChange}
                />
              </CardContent>
              <CardContent>
                <Typography className={classes.cardTitle}>
                  <FormattedMessage id="BLOGS.EDIT.DESCRIPTION" />
                </Typography>
                <div className="kt-space-20" />
                <Input
                  className={classes.inputDescription}
                  value={blog.description}
                  onChange={onDescChange}
                  multiline
                />
              </CardContent>
              <CardContent>
                <div className={`${classes.rowBody}`}>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.BODY" />
                  </Typography>
                  <Fab
                    size="small"
                    color="default"
                    aria-label="add"
                    onClick={onAddCKE}
                    className={classes.btnAdd}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                {blog.contents.map((content, index) => (
                  <div key={index} className={classes.ckeContainer}>
                    <IconButton
                      aria-label="delete"
                      className={classes.btnRemoveCKE}
                      onClick={() => {
                        onRemoveCKE(index);
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
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
            <div className={`col-xl-4 ${classes.containerRight}`}>
              <Card className={`${classes.cardContainerRight}`}>
                <CardContent className={`row ${classes.statusContainer}`}>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.STATUS" />
                  </Typography>
                  <Switch
                    checked={blog.status !== BLOG_STATUS.DISABLED}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                    onChange={() => {
                      onChangeStatus(
                        blog.status !== BLOG_STATUS.DISABLED
                          ? BLOG_STATUS.DISABLED
                          : BLOG_STATUS.PUBLISHED
                      );
                    }}
                  />
                </CardContent>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.CATEGORIES" />
                  </Typography>
                  <div className="kt-space-20" />
                  <Autocomplete
                    id="combo-box-demo"
                    options={filterCategoriesByArray(
                      categories,
                      blog.categories
                    )}
                    getOptionLabel={category => category.title}
                    onChange={(event, value) => {
                      onChooseCategory(value);
                    }}
                    value={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={
                          <FormattedMessage id="BLOGS.EDIT.CHOOSE_CATEGORY" />
                        }
                        className={classes.categoriesContainer}
                        variant="outlined"
                      />
                    )}
                  />
                  {blog.categories.map((category, index) => (
                    <div key={index}>
                      <div className={classes.categoryTag}>
                        <Typography>{category.title}</Typography>
                        <Button
                          color="primary"
                          size="small"
                          className={classes.categoryTagBtn}
                          onClick={() => {
                            onDeleteCategory(category, index);
                          }}
                        >
                          <ClearIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.TAGS" />
                  </Typography>
                  <div className="kt-space-20" />
                  <ChipInput
                    variant="outlined"
                    value={blog.tags}
                    onAdd={chip => {
                      handleAddChip(chip);
                    }}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="kt-space-20" />
                  <TextField
                    className={classes.inputTitle}
                    label={<FormattedMessage id="BLOGS.EDIT.EXTRA_DATA.FB" />}
                    variant="outlined"
                    value={blog.extra_data[BLOG_EXTRA_DATA.FB_PIXEL_ID]}
                    onChange={onFBPixelIdChange}
                  />
                </CardContent>
                <CardContent>
                  <div className="kt-space-20" />
                  <TextField
                    className={classes.inputTitle}
                    label={<FormattedMessage id="BLOGS.EDIT.EXTRA_DATA.GG" />}
                    variant="outlined"
                    onChange={onGAIdChange}
                    value={blog.extra_data[BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]}
                  />
                </CardContent>
              </Card>
            </div>
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
      <div className={`${classes.rowFootHeader}`}>
        {id !== BLOG.QUERY_NEW ? (
          <Button
            variant="contained"
            color="inherit"
            className={`${classes.btnFooter}`}
            startIcon={<DeleteIcon />}
            onClick={onDelete}
          >
            <FormattedMessage id="BLOGS.EDIT.DELETE" />
          </Button>
        ) : (
          <div></div>
        )}
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnHeader}
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            <FormattedMessage id="BLOGS.EDIT.SUBMIT" />
          </Button>
          <Button
            variant="contained"
            color="inherit"
            className={classes.btnHeader}
            onClick={onClear}
          >
            <FormattedMessage id="BLOGS.EDIT.CANCEL" />
          </Button>
        </div>
      </div>
    </>
  );
};

BlogEdit.propTypes = {
  blogData: PropTypes.shape({}),
  getCategoriesSuccess: PropTypes.func.isRequired
};
BlogEdit.defaultProps = {
  categories: []
};

const mapStateToProps = state => ({
  blogData: state.blog.blogData,
  categories: state.category.categoriesList
});

const mapDispatchToProps = {
  getCategoriesSuccess: category.actions.getCategoriesSuccess
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BlogEdit)
);
