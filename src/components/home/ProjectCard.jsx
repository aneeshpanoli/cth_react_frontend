import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LongMenu from "../menu/LongMenu";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateSelectedProject } from "../redux/actions";
import { useHistory } from "react-router-dom";
import Flag from "react-world-flags";
import { getImgUrl } from "../js/utils";
import Link from "@material-ui/core/Link";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Chip from "@material-ui/core/Chip";
import { countries } from "../search/utils";

function countryToIso(country) {
  let filteredData = countries.filter((d) => d.label === country);
  if (filteredData[0]) {
    return filteredData[0].code;
  }
  return "US";
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "1px solid #E8E8E8",
    borderRadius: 15,
  },
  media: {
    height: "8rem",
    width: "100%",
    paddingTop: "50%", // 16:9
  },
  avatar: {
    backgroundColor: "transparent",
    width: "1.4rem",
    height: "1.4rem",
  },
  overlay: {
    position: "absolute",
    top: "56.25%",
    left: "1.2rem",
    color: "black",
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "0.2rem",
  },
  button: {
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main,
    textTransform: "none",
    position: "absolute",
    left: "62%",
    textAlign: "middle",
    transform: `translateX(-50%)`,
    // bottom: "0.8rem",
    width: "8rem",
    // height: "2.5rem",
  },
  chipGrey: {
    backgroundColor: "silver",
  },
  chipGreen: {
    backgroundColor: theme.palette.safe,
  },
  chipRed: {
    backgroundColor: theme.palette.danger,
  },
}));

export default function ProjectCard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  const [mouseMoved, setMouseMoved] = useState(false);
  const [upvotes, setUpvotes] = React.useState([]);
  const [downvotes, setDownvotes] = React.useState([]);
  const { authData } = useTrackedState();

  React.useEffect(() => {
    if (props.r && props.r._source.downvotes) {
      setDownvotes(props.r._source.downvotes);
    }
    if (props.r && props.r._source.upvotes) {
      setUpvotes(props.r._source.upvotes);
    }
  }, [props]);

  const percentLikes = () => {
    if (upvotes.length && downvotes.length) {
      return (
        Math.round(
          (upvotes.length / (upvotes.length + downvotes.length)) * 100
        ) + "%"
      );
    } else if (upvotes.length && (!downvotes || !downvotes.length)) {
      return "100%";
    }
    return "0%";
  };

  // console.log(r)
  const handleLearnmore = (selectedProject) => {
    if (selectedProject && !mouseMoved) {
      dispatch(updateSelectedProject(selectedProject));

      history.push(
        "/" +
          selectedProject._source.title.replace(/\s+/g, "-") +
          "/" +
          selectedProject._id
      );
    }
  };

  const makeChip = () => {
    if (authData._source && upvotes.includes(authData._source.id)) {
      return (
        <Chip
          className={classes.chipGreen}
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    } else if (authData._source && downvotes.includes(authData._source.id)) {
      return (
        <Chip
          className={classes.chipRed}
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    } else {
      return (
        <Chip
          className={classes.chipGrey}
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    }
  };

  return (
    <Fade
      in={checked}
      key={props.r._id}
      style={{ transitionDelay: checked ? "300ms" : "0ms" }}
    >
      <Card className={classes.root}>
        <CardHeader
          action={<LongMenu r={props.r} esIndex="projects" />}
          className={classes.header}
        />
        <ButtonBase>
          <Link
            onMouseMove={() => setMouseMoved(true)}
            onMouseDown={() => setMouseMoved(false)}
            onMouseUp={() => handleLearnmore(props.r)}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              className={classes.media}
              image={getImgUrl(props.r._source.image)}
              title=""
            >
              {" "}
            </CardMedia>
            <div className={classes.overlay}></div>
            <CardHeader
              title={
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    wordBreak: "break-word",
                    hyphens: "auto",
                    lineHeight: "1rem",
                    display: "inline-block",
                  }}
                >
                  {props.r._source.title}
                </span>
              }
              subheader={
                <span
                  style={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                    lineHeight: "1rem",
                    display: "inline-block",
                  }}
                >
                  {props.r._source.hackathons[0]
                    ? props.r._source.hackathons[0]
                    : null}
                </span>
              }
              avatar={
                <Avatar
                  title={props.r._source.country}
                  aria-label="project"
                  className={classes.avatar}
                >
                  <Flag
                    code={countryToIso(props.r._source.country)}
                    height="35"
                  />
                </Avatar>
              }
              style={{ height: "5rem", textAlign: "left" }}
            />

            <CardContent
              title="Short description"
              style={{ height: "10rem", textAlign: "left" }}
            >
              <Typography
                variant="body1"
                color="primary"
                component="div"
                style={{ overflow: "hidden" }}
              >
                {props.r._source.subtitle.substring(0, 125) + "..."}
              </Typography>
            </CardContent>
            <CardActions>
              {makeChip()}

              <Button
                variant="contained"
                onClick={() => handleLearnmore(props.r)}
                className={classes.button}
                disableElevation
                component="div"
              >
                Learn more
              </Button>
            </CardActions>
          </Link>
        </ButtonBase>
      </Card>
    </Fade>
  );
}
