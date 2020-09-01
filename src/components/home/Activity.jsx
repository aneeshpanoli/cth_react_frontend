import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
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

export default function Activity() {
  const history = useHistory();
  const { authData } = useTrackedState();
  const handleClick = () => {
    setTimeout(() => {
      history.push("/search");
    }, 1000);
  };

  const handleJoin = () => {
    history.push("/sign-in");
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={0}>
          <Grid container style={{ marginTop: "2%" }}>
            <Grid item xs={12} sm={12} md={12}>
              <h4 style={{ fontWeight: 700 }}>
                <AssessmentOutlinedIcon /> Activity
              </h4>
              <hr></hr>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <h6 style={{ fontWeight: 400 }}>
                <TimelineOutlinedIcon /> You visited project A
              </h6>
              <h6 style={{ fontWeight: 400 }}>
                <CommentOutlinedIcon /> You commented on project B
              </h6>
              <h6 style={{ fontWeight: 400 }}>
                <ThumbUpOutlinedIcon /> You liked project C
              </h6>
              <h6 style={{ fontWeight: 400 }}>
                <AccountBoxOutlinedIcon /> You checked out John Doe
              </h6>
              <h6 style={{ fontWeight: 400 }}>
                <LibraryAddCheckOutlinedIcon /> You picked up a microtask
              </h6>
              <h6 style={{ fontWeight: 400 }}>
                <LibraryAddOutlinedIcon /> You created a microtask
              </h6>
              <hr></hr>
            </Grid>
            <Grid item xs={12} sm={6} md={6} align="right">
            <Grid item xs={12} sm={12} md={12} align="center">
            <Button
            onClick={()=>history.push('/create-project')}
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
            <hr></hr>
          </Grid>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid container spacing={0}>
         
        </Grid>
      </Container>
    </Box>
  );
}
