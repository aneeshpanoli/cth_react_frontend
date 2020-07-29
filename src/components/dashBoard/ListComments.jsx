import React from "react";
import "react-quill/dist/quill.snow.css";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { simpleQueryElasticsearch } from "../backend/AxiosRequest";
import { MATCH_PROJ_ID } from "../backend/EsQueries";
import { updateCommentsData } from "../redux/actions";
import { Link } from "react-router-dom";
import { parseToDays } from "../js/datePrase";
import parseHtml from "html-react-parser";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import FlagIcon from '@material-ui/icons/Flag';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from "@material-ui/core/Button";


export default function ListComments(props) {
  const { commentsData } = useTrackedState();
  const dispatch = useDispatch();
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    if (props.projectId) {
      // console.log("getting comments");
      const query = MATCH_PROJ_ID(props.projectId, "comments");
      simpleQueryElasticsearch(query, dispatch, updateCommentsData);
    }
  }, []);
  React.useEffect(() => {
    setComments(commentsData);
    // console.log(commentsData);
  }, [commentsData]);

  return (
    <Grid container spacing={0}>
      {comments && comments[0]
        ? comments.map((comment, i) => (
            <Grid item xs={12} key={i}>
              <Grid item xs={12}>
                <Link to={`/@${comment._source.username}`}>
                  {comment._source.username}
                </Link>

                <Tooltip
                  title={new Date(
                    comment._source.createdAt
                  ).toLocaleString("default", {
                    dateStyle: "long",
                    timeStyle: "long",
                  })}
                  placement="top"
                >
                  <span>
                    {" "}
                    commented {parseToDays(comment._source.createdAt)}
                  </span>
                </Tooltip>
              </Grid>
              <Divider variant="inset" />


              <Grid container spacing={0} direction='row'>
                <Grid item xs={2} md={1} sm={1}>
                  <Grid item xs={12}>
                    <Button startIcon={<ThumbUpIcon />} size='small'>
                      {''}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                  <Button startIcon={<FlagIcon />} size='small'>
                      {''}
                    </Button>
                    
                  </Grid>
                </Grid>
                <Grid item xs={10} md={11} sm={11}>
                  {parseHtml(comment._source.comments)}
                </Grid>
              </Grid>
            </Grid>
          ))
        : null}
    </Grid>
  );
}
