import React, { useEffect, useState } from "react";
import { uploadImageBasic } from "../../../api/image.api";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import { keyBy, filter } from "lodash";

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
  BLOG_STATUS,
  BLOG
} from "../../../constants/blog";
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";

const THUMBNAIL = "thumbnail";


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
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { handleSubmit, control, setValue, getValues, watch } = useForm();
  const categoriesField = useFieldArray({
    control,
    name: "categories"
  });

  const tagsField = useFieldArray({
    control,
    name: "tags"
  });

  const thumbnailWatch = watch(THUMBNAIL);

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

  // const onSubmit = () => {
  //   if (id !== BLOG.QUERY_NEW) {
  //     disptach(updateBlog({
  //       id,
  //       blog
  //     }));
  //   } else {
  //     disptach(createBlog(blog));
  //   }
  // };

  const onDelete = () => {
    disptach(deleteBlog({
      id: blog.id
    }));
  };

  const onContentChange = (index, content, data) => {
    const newContents = blog.contents;
    let newContent = blog.contents[index];
    newContent = { ...content, content: data, type: "HTML" };
    newContents[index] = newContent;
    setBlog({ ...blog, contents: newContents });
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

  const onOpenDeleteBlog = () => {
    setOpenModalDelete(true);
  };

  const handleChangeImage = async (event) => {
    if (event.target.value.length !== 0) {
      setValue(THUMBNAIL, URL.createObjectURL(event.target.files[0]));
      const { url } = await uploadImageBasic(event.target.files[0]);
      setValue(THUMBNAIL, url);
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
                    </CardContent>
                    <CardContent>
                      <Typography>
                        Mô tả
                  </Typography>
                      <Controller
                        as={<TextField fullWidth multiline placeholder="Nhập mô tả..." disabled={requesting} />}
                        name="description"
                        control={control}
                        defaultValue=""
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
                          onChange={(_, editor) => {
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
                        <Controller
                          render={(props) => (
                            <Switch
                              {...props}
                              color="primary"
                              checked={props.value !== BLOG_STATUS.DISABLED}
                              disabled={requesting}
                              onChange={() => {
                                props.onChange(
                                  props.value !== BLOG_STATUS.DISABLED
                                    ? BLOG_STATUS.DISABLED
                                    : BLOG_STATUS.PUBLISHED

                                )
                              }}
                            />
                          )}
                          name="status"
                          control={control}
                          defaultValue={BLOG_STATUS.DISABLED}
                        />
                      </Box>

                    </UiCardContent>
                    <UiCardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Danh mục
                      </Typography>
                      <Controller
                        name="categories"
                        control={control}
                        defaultValue={[]}
                        render={(props) => (
                          <Autocomplete
                            options={filterCategoriesByArray(
                              categories,
                              props.value
                            )}
                            getOptionLabel={(category) => category.title}
                            onChange={(_, value) => {
                              categoriesField.append(value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Chọn danh mục"
                                variant="outlined"
                              />
                            )}
                            disabled={requesting}
                          />
                        )}
                      />
                      {categoriesField.fields.map((category, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mt={2} ml={2}
                        >
                          <Typography>{category.title}</Typography>
                          <Button
                            color="primary"
                            size="small"
                            className={classes.categoryTagBtn}
                            onClick={() => {
                              categoriesField.remove(index);
                            }}
                            disabled={requesting}
                          >
                            <ClearIcon />
                          </Button>
                        </Box>
                      ))}
                    </UiCardContent>
                    <UiCardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Gắn thẻ
                      </Typography>
                      <Controller
                        name="tags"
                        control={control}
                        defaultValue={[]}
                        render={(props) => (
                          <ChipInput
                            variant="outlined"
                            value={props.value}
                            onAdd={(chip) => {
                              tagsField.append(chip);
                            }}
                            onDelete={(_, index) => tagsField.remove(index)}
                            disabled={requesting}
                          />
                        )}
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
                          <Controller
                            control={control}
                            name={THUMBNAIL}
                            defaultValue=""
                            as={<input
                              type="hidden"
                            />}
                          />

                        </>
                      }
                    ></UiCardHeader>
                    <UiCardContent>
                      {thumbnailWatch && (
                        <img
                          className={classes.thumbnail}
                          src={thumbnailWatch}
                          alt="thumb"
                        />
                      )}
                    </UiCardContent>
                  </UiCard>
                  <UiCard>
                    <UiCardHeader title="Thông tin khác"></UiCardHeader>
                    <UiCardContent>
                      <Controller
                        control={control}
                        name="extra_data.facebook_pixel_id"
                        defaultValue=""
                        as={
                          <TextField
                            fullWidth
                            label="Facebook Pixel ID"
                            variant="outlined"
                            disabled={requesting}
                          />
                        }
                      />

                    </UiCardContent>
                    <UiCardContent>
                      <Controller
                        control={control}
                        name="extra_data.google_analytics_id"
                        defaultValue=""
                        as={
                          <TextField
                            fullWidth
                            label="Google Analytics ID"
                            variant="outlined"
                            disabled={requesting}
                          />
                        }
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
