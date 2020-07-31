import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LongMenu from "../menu/LongMenu";
import { useDispatch } from "reactive-react-redux";
import { updateSelectedProject } from "../redux/actions";
import { useHistory } from "react-router-dom";
import Flag from "react-world-flags";
import { getImgUrl } from "../js/utils";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import ButtonBase from '@material-ui/core/ButtonBase';

import { countries } from "./utils";

function countryToIso(country) {
  let filteredData = countries.filter((d) => d.label === country);
  return filteredData[0].code;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "16rem",
    border: "1px solid #E8E8E8",
    borderRadius: 15,
  },
  media: {
    height: '8rem',
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
    left: "50%",
    transform: `translateX(-50%)`,
    bottom: "0.8rem",
    width: "9rem"
    },
}));

export default function ProjectCard({ r }) {
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
        <ButtonBase>
        <Link 
          onMouseMove={() => setMouseMoved(true)}
          onMouseDown={() => setMouseMoved(false)}
          onMouseUp={() => handleLearnmore(r)}
          style={{ textDecoration: "none"}}
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
              <span style={{ fontWeight: 700, fontSize: 14, wordBreak: "break-word", hyphens: 'auto'}}>
                {r._source.title}
              </span>
            }
            subheader={r._source.hackathons[0] ? r._source.hackathons[0] : null}
            avatar={
              <Avatar
                title={r._source.country}
                aria-label="project"
                className={classes.avatar}
              >
                <Flag code={countryToIso(r._source.country)} height="35" />
              </Avatar>
            }
            style={{ height: "5rem", textAlign:'left'}}
          />

          <CardContent title="Short description" style={{ height: "8rem", textAlign:'left'}}>
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
