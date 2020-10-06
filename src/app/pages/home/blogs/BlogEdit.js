import React, { useEffect, useState } from "react";
import { uploadImageBasic } from "../../../api/image.api";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useForm, Controller, useWatch, useFormContext, FormProvider } from 'react-hook-form';
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
import {
  createBlog
} from "../../../api/blog.api";

import { ROUTES } from "../../../router/Routes";
import {
  getCategories
} from "../../../store/categories/actions";
import {
  getBlog,
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
const TAGS = "tags";
const CATEGORIES = "categories";
const CONTENTS = "contents";

let renderCount = 0;

const BlogEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const disptach = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  renderCount++;
  const {
    categories,
    redirectCount,
    successMessage
  } = useSelector(
    ({ blog, categories }) => ({
      categories: categories.categories,
      redirectCount: blog.redirectCount,
      errorMessage: blog.errorMessage,
      successMessage: blog.successMessage
    }),
    shallowEqual
  );

  const [requesting, setRequesting] = useState(false);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const methods = useForm({
    defaultValues: {
      id: null,
      title: "",
      contents: [
        {
          content: "Chèn nội dung",
          type: "HTML", // HTML
        },
      ],
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
  const { handleSubmit, control, setValue, getValues, watch, register, errors } = methods;
  const thumbnailWatch = watch(THUMBNAIL);

  useEffect(() => {
    disptach(getCategories());
  }, []);

  // useEffect(() => {
  //   disptach(resetMessage());
  //   disptach(getCategories());
  //   if (id !== "new") {
  //     disptach(getBlog({ id }));
  //   } else {
  //     disptach(resetBlog());
  //   }
  //   setInitialized(true);
  // }, [disptach, id]);

  // useEffect(() => {
  //   setBlog(initBlog);
  // }, [initBlog]);

  // useEffect(() => {
  //   if (initialized) {
  //     history.push(ROUTES.blogs);
  //   }
  // }, [history, redirectCount]);

  // useEffect(() => {
  //   if (initialized && successMessage) {
  //     enqueueSnackbar(successMessage, {
  //       variant: "success"
  //     });
  //   }
  // }, [enqueueSnackbar, successMessage, initialized]);

  // useEffect(() => {
  //   if (initialized && errorMessage) {
  //     enqueueSnackbar(errorMessage, {
  //       variant: "error"
  //     });
  //   }
  // }, [enqueueSnackbar, errorMessage, initialized]);

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
      // id: blog.id
    }));
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
    console.log(blog);
    setRequesting(true);
    try {
      if (blog.id) {
        // TODO: call update api
      } else {
        // TODO: call create api
        const response = await createBlog(blog);
        enqueueSnackbar("Tạo blog thành công", {
          variant: "success"
        });
      }
    } catch (error) {

    }
    setRequesting(false);
  }

  return (
    <Container>
      <h1>{renderCount}</h1>
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box marginTop={2} marginBottom={2}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card>
                  <CardContent>
                    <Typography >
                      Tiêu đề
                  </Typography>
                    <TextField
                      name="title"
                      inputRef={register({ required: true, maxLength: 70 })}
                      fullWidth
                      placeholder="Nhập tiêu đề..."
                      disabled={requesting}
                      error={errors.title ? true : false}
                    />

                  </CardContent>
                  <CardContent>
                    <Typography>
                      Mô tả
                  </Typography>
                    <TextField
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
                    <Typography variant="subtitle2" gutterBottom>
                      Nội dung
                  </Typography>
                    <Controller
                      control={control}
                      name={`${CONTENTS}[0].content`}
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
                    <input type="hidden" name={`${CONTENTS}[0].type`} defaultValue="HTML" ref={register} />

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
                    <CategoryEdit
                      categories={categories}
                      disabled={requesting}
                      classes={classes}
                    />
                  </UiCardContent>
                  <UiCardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Gắn thẻ
                  </Typography>
                    <TagEdit
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
      </FormProvider>

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

const TagEdit = ({ disabled }) => {
  const { control, getValues, setValue } = useFormContext();

  const tags = useWatch({
    control,
    name: TAGS,
    defaultValue: []
  });

  const onDeleteTag = (_, index) => {
    let currentTags = getValues(TAGS);
    currentTags.splice(index, 1);
    setValue(TAGS, currentTags);
  }

  return tags && <Controller
    name={TAGS}
    as={ChipInput}
    variant="outlined"
    control={control}
    defaultValue={[]}
    onDelete={onDeleteTag}
    disabled={disabled}
    fullWidth
  />
}

const CategoryEdit = ({ disabled, classes, categories }) => {
  const { control, getValues, setValue } = useFormContext();
  const [catSearach, setCatSearch] = useState(null);

  const selectedCategories = useWatch({
    control,
    name: CATEGORIES,
    defaultValue: []
  });

  const filterCategoriesByArray = (arr, arrDif) => {
    let lookup = keyBy(arrDif, (o) => {
      return o.id ? o.id.toString() : "" + o.title;
    });
    let result = filter(arr, (u) => {
      return lookup[u.id ? u.id.toString() : "" + u.title] === undefined;
    });
    return result;
  };

  const onAddCategory = (_, selectedCat) => {
    let currentCats = getValues(CATEGORIES);
    if (!currentCats.some(cat => cat.id === selectedCat.id)) {
      currentCats.push(selectedCat);
      setValue(CATEGORIES, currentCats);
    }
    setCatSearch(null);
  }

  const onRemoveCategory = (index) => {
    let currentCats = getValues(CATEGORIES);
    currentCats.splice(index, 1);
    setValue(CATEGORIES, currentCats);
  }
  return <>
    <Controller
      name={CATEGORIES}
      control={control}
      defaultValue={[]}
      render={() => (
        <Autocomplete
          value={catSearach}
          options={filterCategoriesByArray(
            categories,
            selectedCategories
          )}
          getOptionLabel={(category) => category.title}
          onChange={onAddCategory}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn danh mục"
              variant="outlined"
            />
          )}
          disabled={disabled}
        />
      )}
    />

    {
      selectedCategories.map((category, index) => (
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
              onRemoveCategory(index);
            }}
            disabled={disabled}
          >
            <ClearIcon />
          </Button>
        </Box>
      ))
    }
  </>
}
