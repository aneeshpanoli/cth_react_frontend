import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import { useTrackedState } from 'reactive-react-redux'
import { createDoc } from '../backend/AxiosRequest'

export default function Comments(props) {
  const [text, setText] = React.useState("");
  const [comments, setComments] = React.useState([])
  const {authData} = useTrackedState();

  const handleChange = (value) => {
    setText(value);
    console.log(value);
  };

  const handleCancel = () => {
    setText("");
  };

  const handlePost = () => {
    console.log(text);
    let data = {
      params: {
        index: "comments",
        q: {
          projectId: props.projectId,
          userId: authData.user.id,
          userFnLn: authData.user.first_name+' '+authData.user.last_name,
          comments: text,
          createdAt: new Date()
        },
      },
    };
    createDoc(data, authData.key)
    setText("");
  };

  return (
    <React.Fragment>
      <ReactQuill value={text} onChange={handleChange} />
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "0.5rem" }}
        onClick={handlePost}
      >
        Post comment
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "0.5rem" }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <div>
        {comments.map((comment) =>
        comment
        )}
      </div>
    </React.Fragment>
  );
}
