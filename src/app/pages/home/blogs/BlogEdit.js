import React, { useEffect, useState } from "react";
import { uploadImageBasic } from "../../../api/image.api";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import {
  Card,
  CardContent,
  Typography,
  Input,
  Button,
  Switch,
  TextField,
  Grid,
  Container
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "./styles";
import CKEditor from "ckeditor4-react";
import ChipInput from "material-ui-chip-input";
import { remove, keyBy, filter } from "lodash";

import { ROUTES } from "../../../router/Routes";
import {
  getCategories
} from "../../../store/categories/actions";
import {
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  resetBlog,
  resetMessage
} from "../../../store/blog/actions";

import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";
import UiCard from "../../../components/Ui/Card/Card";
import UiCardHeader from "../../../components/Ui/Card/CardHeader";
import UiCardContent from "../../../components/Ui/Card/CardContent";
import {
  BLOG_EXTRA_DATA,
  BLOG_STATUS,
  BLOG
} from "../../../constants/blog";
import {
  handleFileUploadRequest,
  handleFileUploadResponse,
} from "../../../utils/imageUtils";
import config from "../../../config/apiConfig";

const imageService = config.domain.imageService;

const BlogEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const disptach = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    categories,
    initBlog,
    requesting,
    redirectCount,
    errorMessage,
    successMessage
  } = useSelector((
    { blog, categories }) => ({
      categories: categories.categories,
      initBlog: blog.blog,
      requesting: blog.requesting,
      redirectCount: blog.redirectCount,
      errorMessage: blog.errorMessage,
      successMessage: blog.successMessage
    }),
    shallowEqual
  );
  const [initialized, setInitialized] = useState(false);
  const [blog, setBlog] = useState(null);
  const [thumbUrl, setThumbUrl] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    disptach(resetMessage());
    disptach(getCategories());
    if (id !== "new") {
      disptach(getBlog({ id }));
    } else {
      disptach(resetBlog());
    }
    setInitialized(true);
  }, [disptach, id]);

  useEffect(() => {
    setBlog(initBlog);
  }, [initBlog]);

  useEffect(() => {
    if (blog !== null) {
      setThumbUrl(blog.thumbnail);
    }
  }, [blog]);

  useEffect(() => {
    if (initialized) {
      history.push(ROUTES.blogs);
    }
  }, [history, redirectCount]);

  useEffect(() => {
    if (initialized && successMessage) {
      enqueueSnackbar(successMessage, {
        variant: "success"
      });
    }
  }, [enqueueSnackbar, successMessage, initialized]);

  useEffect(() => {
    if (initialized && errorMessage) {
      enqueueSnackbar(errorMessage, {
        variant: "error"
      });
    }
  }, [enqueueSnackbar, errorMessage, initialized]);

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
      disptach(updateBlog({
        id,
        blog
      }));
    } else {
      disptach(createBlog(blog));
    }
  };

  const onDelete = () => {
    disptach(deleteBlog({
      id: blog.id
    }));
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

  const handleChangeImage = async (event) => {
    if (event.target.value.length !== 0) {
      setThumbUrl(URL.createObjectURL(event.target.files[0]));
      const { url } = await uploadImageBasic(event.target.files[0]);
      setThumbUrl(url);
      setBlog({ ...blog, thumbnail: url });
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
        Blogs
      </Button>
      <div className={`${classes.rowHeader}`}>
        <Typography variant="h4">
          {id !== BLOG.QUERY_NEW ? "Chỉnh sửa" : "Tạo mới"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnHeader}
          startIcon={<SaveIcon />}
          onClick={onSubmit}
          disableElevation
          disabled={requesting}
        >
          Lưu
        </Button>
      </div>
      <Grid container spacing={3}>
        {blog && (
          <>
            <Grid item xs={9}>
              <Card>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    Tiêu đề
                  </Typography>
                  <Input
                    className={classes.inputFullWidth}
                    value={blog.title}
                    onChange={onTitleChange}
                    placeholder="Nhập tiêu đề..."
                    disabled={requesting}
                  />
                </CardContent>
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    Mô tả
                  </Typography>
                  <Input
                    className={classes.inputFullWidth}
                    value={blog.description}
                    onChange={onDescChange}
                    multiline
                    placeholder="Nhập mô tả..."
                    disabled={requesting}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className={`${classes.rowBody}`}>
                    <Typography className={classes.cardTitle}>
                      Nội dung
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
                          `${imageService}/v1/upload`,
                        uploadUrl:
                          `${imageService}/v1/upload`,
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
                      onBlur={(event, editor) => { }}
                      onFocus={(event, editor) => { }}
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
                    Trạng thái
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
                    disabled={requesting}
                  />
                </UiCardContent>
                <UiCardContent>
                  <Typography className={classes.cardTitle}>
                    Danh mục
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
                        label="Chọn danh mục"
                        className={classes.categoriesContainer}
                        variant="outlined"
                      />
                    )}
                    disabled={requesting}
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
                        disabled={requesting}
                      >
                        <ClearIcon />
                      </Button>
                    </div>
                  ))}
                </UiCardContent>
                <UiCardContent>
                  <Typography className={classes.cardTitle}>
                    Gắn thẻ
                  </Typography>
                  <ChipInput
                    className={classes.inputFullWidth}
                    variant="outlined"
                    value={blog.tags}
                    onAdd={(chip) => {
                      handleAddChip(chip);
                    }}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    disabled={requesting}
                  />
                </UiCardContent>
              </UiCard>
              <UiCard>
                <UiCardHeader
                  title="Thumbnail"
                  actionComponent="label"
                  action={
                    <>
                      Tải ảnh lên
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
                    label="Facebook Pixel ID"
                    variant="outlined"
                    value={blog.extra_data[BLOG_EXTRA_DATA.FB_PIXEL_ID]}
                    onChange={onFBPixelIdChange}
                    disabled={requesting}
                  />
                </UiCardContent>
                <UiCardContent>
                  <TextField
                    className={classes.inputFullWidth}
                    label="Google Analytics ID"
                    variant="outlined"
                    onChange={onGAIdChange}
                    value={blog.extra_data[BLOG_EXTRA_DATA.GOOGLE_ANALYTICS_ID]}
                    disabled={requesting}
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
            disableElevation
            disabled={requesting}
          >
            Xóa
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
            disableElevation
            disabled={requesting}
          >
            Lưu
          </Button>
        </div>
      </div>
      <ConfirmDelete
        message="Bạn có chắc chắn muốn xóa blog này?"
        title="Xác nhận xóa"
        open={openModalDelete}
        onSubmit={onDelete}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </Container>
  );
};

export default BlogEdit;
