import React, { useEffect, useState } from "react";
import { uploadImageBasic } from "../../../api/image.api";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "./styles";
import CKEditor from '@ckeditor/ckeditor5-react';
import EditorTheme from '@ckeditor/ckeditor5-build-classic';
import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
} from "../../../api/blog.api";

import { ROUTES } from "../../../router/Routes";
import {
  getCategories
} from "../../../store/categories/actions";

import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete";
import UiCard from "../../../components/Ui/Card/Card";
import UiCardHeader from "../../../components/Ui/Card/CardHeader";
import UiCardContent from "../../../components/Ui/Card/CardContent";

import InputLabel from "../../../components/Ui/Input/InputLabel";
import {
  BLOG_STATUS,
  BLOG
} from "../../../constants/blog";
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";

const THUMBNAIL = "thumbnail";
const TAGS = "tags";
const CATEGORIES = "categories";

const BlogEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const disptach = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    categories,
    categoryIds
  } = useSelector(
    ({ categories }) => ({
      categories: categories.categories.reduce((obj, item) => {
        return {
          ...obj,
          [item['id']]: item,
        };
      }, {}),
      categoryIds: categories.categories.map(category => category.id)
    }),
    shallowEqual
  );

  const [requesting, setRequesting] = useState(false);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { handleSubmit, control, setValue, watch, register, errors, reset } = useForm({
    defaultValues: {
      id: null,
      title: "",
      tags: [],
      description: "",
      status: "DISABLED",
      categories: [],
      thumbnail: null,
      extra_data: {
        facebook_pixel_id: "",
        google_analytics_id: "",
      },
    }
  });

  const thumbnailWatch = watch(THUMBNAIL);

  useEffect(() => {
    disptach(getCategories());
  }, [disptach]);

  useEffect(() => {
    if (id !== BLOG.QUERY_NEW) {
      setRequesting(true);
      getBlog(id)
        .then(response => {
          const data = response.data.data;
          reset(data);
        })
        .catch(error => {
          enqueueSnackbar(error, {
            variant: "error"
          });
        })
        .finally(() => {
          setRequesting(false);
        });
    }
  }, [id]);

  const onDelete = async () => {
    setRequesting(true);
    try {
      await deleteBlog(id);
      enqueueSnackbar("Đã xóa", {
        variant: "success"
      });
      history.push(ROUTES.blogs);
    } catch (error) {
      enqueueSnackbar(error, {
        variant: "error"
      });
    }
    setRequesting(false);
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

  const onFormSubmit = async (blog) => {
    setRequesting(true);
    try {
      if (blog.id && blog.id !== BLOG.QUERY_NEW) {
        const response = await updateBlog(blog.id, blog);
        const data = response.data.data;
        reset(data);
        enqueueSnackbar("Đã lưu", {
          variant: "success"
        });
      } else {
        const response = await createBlog(blog);
        const data = response.data.data;
        history.push(`${ROUTES.blogs}/${data.id}`);
        enqueueSnackbar("Tạo blog thành công", {
          variant: "success"
        });
      }
    } catch (error) {
      enqueueSnackbar(error, {
        variant: "error"
      });
    }
    setRequesting(false);
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
        <input type="hidden" name="id" defaultValue={id} ref={register} />
        <Box marginTop={2} marginBottom={2}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <InputLabel
                    title="Tiêu đề"
                    require
                  />
                  <TextField
                    variant="outlined"
                    name="title"
                    inputRef={register({ required: true, maxLength: 70 })}
                    fullWidth
                    placeholder="Nhập tiêu đề..."
                    disabled={requesting}
                    error={errors.title ? true : false}
                  />

                </CardContent>
                <CardContent>
                  <InputLabel
                    title="Mô tả"
                  />
                  <TextField
                    variant="outlined"
                    name="description"
                    inputRef={register({ maxLength: 255 })}
                    fullWidth
                    multiline
                    placeholder="Nhập mô tả..."
                    error={errors.description ? true : false}
                    disabled={requesting}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <InputLabel
                    title="Nội dung"
                    require
                  />
                  <Controller
                    control={control}
                    name="content"
                    defaultValue={"<p>Chèn nội dung</p>"}
                    render={({ value, onChange }) => (
                      <CKEditor
                        editor={EditorTheme}
                        data={value}
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
                          onChange(data);
                        }}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <UiCard>
                <UiCardHeader title="Tổ chức"></UiCardHeader>
                <UiCardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <InputLabel
                      title="Trạng thái"
                    />
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
                  <InputLabel
                    title="Danh mục"
                  />

                  {Object.keys(categories).length > 0 && categories.constructor === Object
                    && <Controller
                      render={props => (
                        <Autocomplete
                          multiple
                          options={categoryIds}
                          getOptionLabel={option => {
                            return categories[option].title;
                          }}
                          getOptionSelected={(option, value) => option === value}
                          filterSelectedOptions
                          value={props.value} // value is passed by render from the Controller
                          onChange={(e, values) => setValue(CATEGORIES, values)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="Chọn danh mục"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      control={control}
                      name={CATEGORIES}
                      defaultValue={[]}
                    />
                  }
                </UiCardContent>
                <UiCardContent>
                  <InputLabel
                    title="Gắn thẻ"
                  />
                  <Controller
                    render={props => (
                      <Autocomplete
                        multiple
                        options={props.value}
                        freeSolo
                        filterSelectedOptions
                        value={props.value}
                        onChange={(e, values) => setValue(TAGS, values)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="Nhập thẻ"
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                    control={control}
                    name={TAGS}
                    defaultValue={[]}
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
                      <input type="hidden" name={THUMBNAIL} ref={register} defaultValue="" />
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
                  <TextField
                    name="extra_data.facebook_pixel_id"
                    inputRef={register}
                    fullWidth
                    label="Facebook Pixel ID"
                    variant="outlined"
                    disabled={requesting}
                  />

                </UiCardContent>
                <UiCardContent>
                  <TextField
                    name="extra_data.google_analytics_id"
                    inputRef={register}
                    fullWidth
                    label="Google Analytics ID"
                    variant="outlined"
                    disabled={requesting}
                  />
                </UiCardContent>
              </UiCard>
            </Grid>
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
        message="Tác vụ này sẽ xóa blog khỏi hệ thống vĩnh viễn và không thể hoàn tác"
        title="Xóa blog"
        open={openModalDelete}
        requesting={requesting}
        onSubmit={onDelete}
        setOpen={(value) => {
          setOpenModalDelete(value);
        }}
      />
    </Container>
  );
};

export default BlogEdit;

