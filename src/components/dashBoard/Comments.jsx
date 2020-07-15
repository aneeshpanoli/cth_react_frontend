import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import { useTrackedState, useDispatch } from 'reactive-react-redux'
import { createDoc, queryElasticsearch } from '../backend/AxiosRequest'
import { MATCH_PROJ_ID } from '../backend/EsQueries'
import { updateCommentsData} from '../redux/actions'

export default function Comments(props) {
  const {authData, commentsData} = useTrackedState();
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [comments, setComments] = React.useState([])
  const handleChange = (value) => {
    setText(value);
    console.log(value);
  };

  const handleCancel = () => {
    setText("");
  };

  const handlePost = () => {
    console.log(props.projectId);
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

  React.useEffect(() =>{
    if (props.projectId){
    const query = MATCH_PROJ_ID(props.projectId, 'comments');
    queryElasticsearch('', query, dispatch, updateCommentsData)}

  }, [props.projectId])
  React.useEffect(()=> {
    setComments(commentsData);
    console.log(commentsData);
  }, [commentsData])

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
      
        {comments&&comments[0]?comments.map((comment, i) =>
        <React.Fragment key={i} >
        <span dangerouslySetInnerHTML={{ __html:comment._source.comments}}>
        </span> <span>{comment._source.userFnLn}</span>
        </React.Fragment>
        ):null}
      
    </React.Fragment>
  );
}
