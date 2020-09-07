import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SocialShare from "./SocialShare";
import ProjectSettings from "./ProjectSettings";
import ToolTips from "../menu/ToolTips";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import parseHtml from "html-react-parser";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "3rem",
    paddingBottom: "1rem",
    color: "white",
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    fontSize: "1.2rem",
  },


}));

export default function Header(props) {
  const classes = useStyles();



  // console.log(props.selectedProject)

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <Box className={`${classes.paper} dash-header-div`}
    <Box c>
      {props.selectedProject ? (
        <Container>
          <Grid
            container

            // left: "50%",
            // transform: `translateX(-50%)`,
          >
    
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body1">
                {parseHtml(
                  props.selectedProject
                    ? props.selectedProject._source.storyText
                    : null
                )}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
