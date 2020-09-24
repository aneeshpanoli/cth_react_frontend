import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { createDoc, simpleQueryElasticsearch } from "../backend/AxiosRequest";
import { MATCH_PROJ_ID } from "../backend/EsQueries";
import { updateCommentsData } from "../redux/actions";

export default function PostComment(props) {
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const handleChange = (value) => {
    setText(value);
    // console.log(value);
  };

  const handleCancel = () => {
    setText("");
  };

  const handlePost = () => {
    if (!text || text.length < 9) {
      return;
    }
    // console.log(props.projectId);
    let data = {
      index: "comments",
      q: {
        projectId: props.projectId,
        userId: authData.user.id,
        username: authData.user.username,
        comments: text,
        createdAt: new Date(),
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const query = MATCH_PROJ_ID(props.projectId, "comments");
    const updateComments = () =>
      simpleQueryElasticsearch(query, dispatch, updateCommentsData);
    createDoc(formData, authData.key, updateComments);

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
    </React.Fragment>
  );
}
