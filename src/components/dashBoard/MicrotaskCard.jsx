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
import { useDispatch } from "reactive-react-redux";
import { updateSelectedProject } from "../redux/actions";
import { useHistory } from "react-router-dom";
import Flag from "react-world-flags";
import { getImgUrl } from "../js/utils";
import Link from "@material-ui/core/Link";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { countries } from "../search/utils";

function countryToIso(country) {
  let filteredData = countries.filter((d) => d.label === country);
  if (filteredData[0]){
    return filteredData[0].code
  };
  return "US"
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    border: "1px solid #E8E8E8",
    borderRadius: 15,
  },
  media: {
    height: "8rem",
    width: '100%',
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
    left: "50%",
    textAlign: "middle",
    transform: `translateX(-50%)`,
    bottom: "0.8rem",
    width: "9rem",
    height: "2.5rem",
  },
}));

export default function ProjectCard({ r, userAvatar }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  const [mouseMoved, setMouseMoved] = useState(false);
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

  return (
    <Fade
      in={checked}
      key={r._id}
      style={{ transitionDelay: checked ? "300ms" : "0ms" }}
    >
      <Card className={classes.root}>
        <CardHeader action={<LongMenu r={r} />} className={classes.header} />
        <ButtonBase >
          <Link
            onMouseMove={() => setMouseMoved(true)}
            onMouseDown={() => setMouseMoved(false)}
            onMouseUp={() => handleLearnmore(r)}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              className={classes.media}
              image={getImgUrl(r._source.image)}
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
                    lineHeight:'1rem',
                    display: 'inline-block',
                  }}
                >
                  {r._source.title}
                </span>
              }
              subheader={
                <span
                  style={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                    lineHeight:'1rem',
                    display: 'inline-block',
                  }}
                >
                {r._source.hackathons[0] ? r._source.hackathons[0] : null}
                </span>
              }
              avatar={
                <Avatar
                  title={r._source.country}
                  aria-label="project"
                  className={classes.avatar}
                  src={userAvatar}
                >
                 
                </Avatar>
              }
              style={{ height: "5rem", textAlign: "left"}}
            />

            <CardContent
              title="Short description"
              style={{ height: "10rem", textAlign: "left" }}
            >
              <Typography
                variant="body2"
                color="primary"
                component="div"
                style={{ overflow: "hidden" }}
              >
                {r._source.subtitle.substring(0, 125) + "..."}
              </Typography>
            </CardContent>
            <CardActions>
            <Button
              variant="contained"
              onClick={() => handleLearnmore(r)}
              className={classes.button}
              disableElevation
              component='div'
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
