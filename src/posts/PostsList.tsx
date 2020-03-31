import React from "react";
import { List, Datagrid, TextField } from "react-admin";

const PostsList = (props: any) => {
  return (
    <List {...props} perPage={10}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
      </Datagrid>
    </List>
  );
};

export default PostsList;
