import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getBlog,
  updateBlog,
  createBlog,
  deleteBlog,
} from "../../../crud/blog.crud";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Input,
  Button,
  Switch,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "./styles";
import CKEditor from "ckeditor4-react";
import ChipInput from "material-ui-chip-input";
import { BLOG, MESSAGES } from "../../../../_metronic/utils/constants";
import { remove } from "lodash";
import { ROUTES } from "../../../../_metronic/utils/routerList";
import { injectIntl, FormattedMessage } from "react-intl";
import * as category from "../../../store/category";
import { getAllCategories } from "../../../crud/category.crud";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { keyBy, filter } from "lodash";
import {
  BLOG_STATUS,
  BLOG_EXTRA_DATA,
} from "../../../../_metronic/utils/types";
import { useSnackbar } from "notistack";
import { ERR_CODE } from "../../../../_metronic/utils/errCode";
import { uploadImageBasic } from "../../../../_metronic/utils/uploadAdapter";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";
import { Grid, Container } from "@material-ui/core";
import {
  handleFileUploadRequest,
  handleFileUploadResponse,
} from "../../../../_metronic/utils/utils";
import * as blog from "../../../store/blog";
import UiCard from "../../../components/Ui/Card/Card";
import UiCardHeader from "../../../components/Ui/Card/CardHeader";
import UiCardContent from "../../../components/Ui/Card/CardContent";

const initDefaultBlog = {
  title: "",
  contents: [
    {
      content: "Chèn nội dung",
      type: "HTML", // HTML
    },
  ],
  tags: [],
  description: "",
  status: "DISABLED", // DELETED, PUBLISHED, DISABLED
  created_at: new Date().toDateString(),
  updated_at: new Date().toDateString(),
  authors: [],
  categories: [],
  thumbnail: "",
  extra_data: {
    [BLOG_EXTRA_DATA.FB_PIXEL_ID]: "",
    [BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]: "",
  },
};

const BlogEdit = ({
  blogData,
  categories,
  getCategoriesSuccess,
  getBlogSuccess,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [blog, setBlog] = useState(blogData[id]);
  const [thumbUrl, setThumbUrl] = useState(
    blogData[id] && blogData[id].thumbnail ? blogData[id].thumbnail : null
  );
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    const loadCategories = () => {
      getAllCategories().then((res) => {
        getCategoriesSuccess(res.data.data);
      });
    };

    if (id !== BLOG.QUERY_NEW) {
      getBlog(id).then((res) => {
        const blogRes = {
          ...res.data.data,
        };
        setBlog({
          ...blogRes,
        });
        if (blogRes.thumbnail) setThumbUrl(blogRes.thumbnail);
        getBlogSuccess({
          ...blogRes,
        });
      });
    } else {
      setBlog(initDefaultBlog);
    }
    loadCategories();
  }, [getCategoriesSuccess, id, getBlogSuccess]);

  const handleAddChip = (chip) => {
    let newTags = blog.tags;
    newTags[newTags.length] = chip;
    setBlog({ ...blog, tags: newTags });
  };

  const handleDeleteChip = (chip) => {
    let newTags = blog.tags;
    newTags = remove(newTags, (tag) => tag !== chip);
    setBlog({ ...blog, tags: newTags });
  };

  const onChangeStatus = (value) => {
    setBlog({ ...blog, status: value });
  };

  const onSubmit = () => {
    if (id !== BLOG.QUERY_NEW) {
      updateBlog(id, blog).then((data) => {
        history.push(ROUTES.blogs);
      });
    } else {
      createBlog(blog)
        .then((data) => {
          setBlog({
            ...initDefaultBlog,
            contents: [
              {
                content: "Nhập nội dung...",
                type: "HTML", // HTML
              },
            ],
          });
          history.push(ROUTES.blogs);
        })
        .catch(({ response }) => {
          const data = response.data;
          enqueueSnackbar(ERR_CODE[data.meta.code], { variant: "error" });
        });
    }
  };

  const onDelete = () => {
    deleteBlog(blog.id).then((data) => {
      setOpenModalDelete(false);
      history.push(`${ROUTES.blogs}`);
    });
  };

  const onTitleChange = (event) => {
    setBlog({ ...blog, title: event.target.value });
  };

  const onDescChange = (event) => {
    setBlog({ ...blog, description: event.target.value });
  };

  const onContentChange = (index, content, data) => {
    const newContents = blog.contents;
    let newContent = blog.contents[index];
    newContent = { ...content, content: data, type: "HTML" };
    newContents[index] = newContent;
    setBlog({ ...blog, contents: newContents });
  };

  const onChooseCategory = (category) => {
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
    let lookup = keyBy(arrDif, (o) => {
      return o.id ? o.id.toString() : "" + o.title;
    });
    // find all users where "user + age" exists in index, one loop, quick lookup. no nested loops
    let result = filter(arr, (u) => {
      return lookup[u.id ? u.id.toString() : "" + u.title] === undefined;
    });
    return result;
  };

  const onFBPixelIdChange = (evt) => {
    setBlog({
      ...blog,
      extra_data: {
        ...blog.extra_data,
        [BLOG_EXTRA_DATA.FB_PIXEL_ID]: evt.target.value,
      },
    });
  };

  const onGAIdChange = (evt) => {
    setBlog({
      ...blog,
      extra_data: {
        ...blog.extra_data,
        [BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]: evt.target.value,
      },
    });
  };

  const onOpenDeleteBlog = () => {
    setOpenModalDelete(true);
  };

  const handleChangeImage = (event) => {
    if (event.target.value.length !== 0) {
      setThumbUrl(URL.createObjectURL(event.target.files[0]));
      uploadImageBasic(
        event.target.files[0],
        ({ url }) => {
          enqueueSnackbar(MESSAGES.FILE_UPLOAD_SUCCESS, { variant: "success" });
          setThumbUrl(url);
          setBlog({ ...blog, thumbnail: url });
        },
        (errMsg) => {
          enqueueSnackbar(errMsg, { variant: "error" });
        }
      );
    }
  };

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIosIcon />}
        onClick={() => {
          history.goBack();
        }}
      >
        <FormattedMessage id="BLOGS.EDIT.BLOGS" />
      </Button>
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
      <Grid container spacing={3}>
        {blog && (
          <>
            <Grid item xs={9}>
              <Card>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.TITLE" />
                  </Typography>
                  <Input
                    className={classes.inputFullWidth}
                    value={blog.title}
                    onChange={onTitleChange}
                    placeholder="Nhập tiêu đề..."
                  />
                </CardContent>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.DESCRIPTION" />
                  </Typography>
                  <Input
                    className={classes.inputFullWidth}
                    value={blog.description}
                    onChange={onDescChange}
                    multiline
                    placeholder="Nhập mô tả..."
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className={`${classes.rowBody}`}>
                    <Typography className={classes.cardTitle}>
                      <FormattedMessage id="BLOGS.EDIT.BODY" />
                    </Typography>
                  </div>
                  {blog.contents.map((content, index) => (
                    <CKEditor
                      key={index}
                      data={content.content}
                      config={{
                        language: "vi",
                        height: "40em",
                        filebrowserUploadUrl:
                          "http://api-internal-uat.nimbus.com.vn/image-service/v1/upload",
                        uploadUrl:
                          "http://api-internal-uat.nimbus.com.vn/image-service/v1/upload",
                      }}
                      onFileUploadRequest={(event) => {
                        handleFileUploadRequest(event);
                      }}
                      onFileUploadResponse={(evt) => {
                        const url = handleFileUploadResponse(evt);
                        thumbUrl === null && setThumbUrl(url);
                      }}
                      onChange={(event) => {
                        const data = event.editor.getData();
                        onContentChange(index, content, data);
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                    />
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <UiCard>
                <UiCardHeader title="Tổ chức"></UiCardHeader>
                <UiCardContent className={`row ${classes.statusContainer}`}>
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
                </UiCardContent>
                <UiCardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.CATEGORIES" />
                  </Typography>
                  <Autocomplete
                    id="combo-box-demo"
                    options={filterCategoriesByArray(
                      categories,
                      blog.categories
                    )}
                    getOptionLabel={(category) => category.title}
                    onChange={(event, value) => {
                      onChooseCategory(value);
                    }}
                    value={null}
                    renderInput={(params) => (
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
                    <div key={index} className={classes.categoryTag}>
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
                  ))}
                </UiCardContent>
                <UiCardContent>
                  <Typography className={classes.cardTitle}>
                    <FormattedMessage id="BLOGS.EDIT.TAGS" />
                  </Typography>
                  <ChipInput
                    className={classes.inputFullWidth}
                    variant="outlined"
                    value={blog.tags}
                    onAdd={(chip) => {
                      handleAddChip(chip);
                    }}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                  />
                </UiCardContent>
              </UiCard>
              <UiCard>
                <UiCardHeader
                  title="Thumbnail"
                  actionComponent="label"
                  action={
                    <>
                      <FormattedMessage id="BLOGS.EDIT.THUMB_UPLOAD" />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeImage}
                      />
                    </>
                  }
                ></UiCardHeader>
                <UiCardContent>
                  {thumbUrl !== null && (
                    <img
                      className={classes.thumbnail}
                      src={thumbUrl}
                      alt="thumb"
                    />
                  )}
                </UiCardContent>
              </UiCard>
              <UiCard>
                <UiCardHeader title="Thông tin khác"></UiCardHeader>
                <UiCardContent>
                  <TextField
                    className={classes.inputFullWidth}
                    label={<FormattedMessage id="BLOGS.EDIT.EXTRA_DATA.FB" />}
                    variant="outlined"
                    value={blog.extra_data[BLOG_EXTRA_DATA.FB_PIXEL_ID]}
                    onChange={onFBPixelIdChange}
                  />
                </UiCardContent>
                <UiCardContent>
                  <TextField
                    className={classes.inputFullWidth}
                    label={<FormattedMessage id="BLOGS.EDIT.EXTRA_DATA.GG" />}
                    variant="outlined"
                    onChange={onGAIdChange}
                    value={blog.extra_data[BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]}
                  />
                </UiCardContent>
              </UiCard>
            </Grid>
          </>
        )}
      </Grid>
      <div className={`${classes.rowFootHeader}`}>
        {id !== BLOG.QUERY_NEW ? (
          <Button
            variant="contained"
            color="inherit"
            className={`${classes.btnFooter}`}
            startIcon={<DeleteIcon />}
            onClick={onOpenDeleteBlog}
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
        </div>
      </div>
      <ConfirmDelete
        message={<FormattedMessage id="BLOGS.LIST.MODAL_DELETE.DESCRIPTION" />}
        title={<FormattedMessage id="BLOGS.LIST.MODAL_DELETE.TITLE" />}
        open={openModalDelete}
        onSubmit={onDelete}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </Container>
  );
};

BlogEdit.propTypes = {
  blogData: PropTypes.shape({}),
  getCategoriesSuccess: PropTypes.func.isRequired,
};
BlogEdit.defaultProps = {
  categories: [],
};

const mapStateToProps = (state) => ({
  blogData: state.blog.blogData,
  categories: state.category.categoriesList,
});

const mapDispatchToProps = {
  getCategoriesSuccess: category.actions.getCategoriesSuccess,
  getBlogSuccess: blog.actions.getBlogSuccess,
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BlogEdit)
);
