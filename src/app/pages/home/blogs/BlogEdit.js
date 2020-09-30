import React, { useEffect, useState } from "react";
import { uploadImageBasic } from "../../../api/image.api";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  TextField,
  Grid,
  Container,
  Divider,
  Box
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "./styles";
import CKEditor from '@ckeditor/ckeditor5-react';
import EditorTheme from '@ckeditor/ckeditor5-build-classic';
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
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";


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

  const { register, handleSubmit, control } = useForm();


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

  const onFormSubmit = (data) => {
    console.log(data);
  }

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

      <Box marginTop={1} marginBottom={2}>
        <Typography variant="h5">
          {id !== BLOG.QUERY_NEW ? "Chỉnh sửa" : "Tạo mới"}
        </Typography>
      </Box>

      <Divider />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box marginTop={2} marginBottom={2}>
          <Grid container spacing={2}>
            {blog && (
              <>
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <Typography >
                        Tiêu đề
                      </Typography>
                      <Controller
                        as={<TextField fullWidth placeholder="Nhập tiêu đề..." disabled={requesting} />}
                        name="title"
                        control={control}
                        defaultValue=""
                      />
                      {/* <TextField
                        fullWidth
                        value={blog.title}
                        onChange={onTitleChange}
                        placeholder="Nhập tiêu đề..."
                        disabled={requesting}
                      /> */}
                    </CardContent>
                    <CardContent>
                      <Typography>
                        Mô tả
                  </Typography>
                      <TextField
                        fullWidth
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
                      <Typography variant="subtitle2" gutterBottom>
                        Nội dung
                    </Typography>
                      {blog.contents.map((content, index) => (
                        <CKEditor
                          key={index}
                          editor={EditorTheme}
                          data={content.content}
                          config={{
                            language: "vi",
                            toolbar: {
                              viewportTopOffset: 64,
                            },
                            image: {
                              upload: {
                                types: ['png', 'jpeg']
                              }
                            },
                            extraPlugins: [CustomUploadAdapterPlugin]
                          }}
                          onFileUploadRequest={(event) => {
                            handleFileUploadRequest(event);
                          }}
                          onFileUploadResponse={(evt) => {
                            const url = handleFileUploadResponse(evt);
                            thumbUrl === null && setThumbUrl(url);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            onContentChange(index, content, data);
                          }}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <UiCard>
                    <UiCardHeader title="Tổ chức"></UiCardHeader>
                    <UiCardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" >
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
                      </Box>

                    </UiCardContent>
                    <UiCardContent>
                      <Typography variant="subtitle2" gutterBottom>
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
                      <Typography variant="subtitle2" gutterBottom>
                        Gắn thẻ
                  </Typography>
                      <ChipInput
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
                        fullWidth
                        label="Facebook Pixel ID"
                        variant="outlined"
                        value={blog.extra_data[BLOG_EXTRA_DATA.FB_PIXEL_ID]}
                        onChange={onFBPixelIdChange}
                        disabled={requesting}
                      />
                    </UiCardContent>
                    <UiCardContent>
                      <TextField
                        fullWidth
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
        </Box>

        <Divider />

        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
          {id !== BLOG.QUERY_NEW ? (
            <Button
              variant="contained"
              color="inherit"
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
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              disableElevation
              disabled={requesting}
            >
              Lưu
          </Button>
          </div>
        </Box>
      </form>

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
