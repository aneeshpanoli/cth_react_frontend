import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { parseToDaysHoursAgo } from '../js/datePrase'
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import Grid from "@material-ui/core/Grid";
import Head from "../meta/Head";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import { useTrackedState } from "reactive-react-redux";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import LibraryAddCheckOutlinedIcon from "@material-ui/icons/LibraryAddCheckOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import { esAxios } from "../backend/AxiosRequest";
import { GET_LATEST } from "../backend/EsQueries";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export default function Activity() {
  const history = useHistory();
  const { authData } = useTrackedState();
  const [activityData, setActivityData] = React.useState([]);

  const buildActivityJsx = () => {
    const iconMap = {
      project: <TimelineOutlinedIcon />,
      microtask: <PlaylistAddCheckIcon />,
    };
    return (
      <React.Fragment>
        {activityData.map((doc, i) => {
          return (
            <h6 key={i} style={{ fontWeight: 400 }}>
             
              {iconMap[doc._source.categoryName]}{" "}
              {parseToDaysHoursAgo(doc._source.createdAt)}{" "}
              {authData._source.id === doc._source.userId
                ? "you"
                : doc._source.username}{" "}
              {doc._source.activity}{" "}{doc._source.categoryName} <a href={"/"+doc._source.title.replace(/\s+/g, "-")+"/"+doc._source.docId}>{doc._source.title}</a>
            </h6>
          );
        })}
      </React.Fragment>
    );
  };

  const getActivity = () => {
    const query = GET_LATEST("activity", 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        // process response.

        setActivityData(response.data.hits.hits);
        console.log(response.data.hits);
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
  };
  React.useEffect(() => getActivity(), []);
  return (
    <Box>
      <Container>
        <Grid container spacing={0}>
          <Grid container style={{ marginTop: "2rem" }}>
            <Grid item xs={12} sm={12} md={12}>
              <h4 style={{ fontWeight: 700 }}>
                <AssessmentOutlinedIcon /> Activity
              </h4>
              <hr></hr>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {buildActivityJsx()}

            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <Grid item xs={12} sm={12} md={12} align="center">
                <Button
                  onClick={() => history.push("/create-project")}
                  startIcon={<AddToQueueIcon />}
                  variant="contained"
                  color="secondary"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Create a project
                </Button>

                <hr></hr>
              </Grid>
              <Grid item xs={12} sm={12} md={12} align="center">
                <Button
                  startIcon={<GroupAddOutlinedIcon />}
                  variant="contained"
                  color="secondary"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Start a community
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0}></Grid>
      </Container>
    </Box>
  );
}
