import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlog } from "../../../crud/blog.crud";
import { useParams } from "react-router-dom";
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
  TextField,
  Button
} from "@material-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";
import { BLOG } from "../../../../_metronic/utils/constants";

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
      id: 99,
      content: "string",
      type: "string" // HTML
    }
  ],
  tags: ["string"],
  status: "string", // DELETED, PUBLISHED, DISABLED
  created_at: "string",
  updated_at: "string",
  authors: [
    {
      id: "string",
      email: "string",
      first_name: "string",
      last_name: "string",
      avatar: "string"
    },
    {
      id: "string",
      email: "string",
      first_name: "string",
      last_name: "string",
      avatar: "string"
    }
  ]
};

const BlogEdit = ({ blogData }) => {
  const { id } = useParams();
  const classes = useStyles();
  const [blog, setBlog] = useState(blogData[id]);

  useEffect(() => {
    if (id !== BLOG.QUERY_NEW) {
      getBlog(id).then(data => {
        setBlog(data.data);
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
    console.log(chip);
  };

  const handleDeleteChip = (chip, index) => {
    console.log("handleDeleteChip", chip, index);
  };

  const onChangeStatus = event => {
    setBlog({ ...blog, status: event.target.value });
  };

  const onAddAuthor = () => {
    const newAuthors = blog.authors;
    newAuthors[newAuthors.length] = initAuthor;
    setBlog({ ...blog, authors: newAuthors });
  };

  const onSubmit = () => {};

  return (
    <>
      <div className={`row ${classes.rowHeader}`}>
        <Typography variant="h3">
          {id !== BLOG.QUERY_NEW ? "Edit" : "New"}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      <div className={`row ${classes.container}`}>
        {blog && (
          <>
            <Card className={`col-xl-6 ${classes.cardContainer}`}>
              <CardContent>
                <Typography>Title</Typography>
                <Input value={blog.title}></Input>
              </CardContent>
              <CardContent>
                <div className={`row row-full-height ${classes.rowBody}`}>
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
                  <CKEditor
                    key={index}
                    editor={ClassicEditor}
                    data={content.type}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                ))}
              </CardContent>
            </Card>
            <Card className={`col-xl-6 ${classes.cardContainer}`}>
              <CardContent>
                <Typography>Tags</Typography>
                <ChipInput
                  value={blog.tags}
                  onAdd={chip => handleAddChip(chip)}
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
            <Card className={`col-xl-6 ${classes.cardContainer}`}>
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
                      error={!`${author.first_name} ${author.last_name}`.length}
                      label="Name"
                      defaultValue={`${author.first_name} ${author.last_name}`}
                    />
                    <TextField
                      className={classes.textField}
                      error={!author.email.length}
                      label="Email"
                      defaultValue={author.email}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
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
