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

import { countries } from "./utils";

function countryToIso(country) {
  let filteredData = countries.filter((d) => d.label === country);
  return filteredData[0].code;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "28rem",
    border: "1px solid #E8E8E8",
    borderRadius: 15,
  },
  media: {
    height: 0,
    paddingTop: "50%", // 16:9
  },
  expand: {
    transform: "rotate(-90deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(-90deg)",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: "56.25%",
    left: "1.2rem",
    color: "black",
    backgroundColor: "transparent",
  },
}));

export default function ProjectCard({ r }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  // console.log(r)
  const handleExpandClick = (selectedProject) => {
    dispatch(updateSelectedProject(selectedProject));
    history.push(
      "/" +
        selectedProject._source.title.replace(/\s+/g, "-") +
        "/" +
        selectedProject._id
    );
  };

  return (
    <Fade
      in={checked}
      key={r._id}
      style={{ transitionDelay: checked ? "300ms" : "0ms" }}
    >
      <Card className={classes.root}>
        <CardHeader
          action={<LongMenu r={r} />}
          style={{
            backgroundColor: "#3D3B63",
            color: "white",
            height: "0.2rem",
          }}
        />

        <CardMedia
          className={classes.media}
          image={getImgUrl(r._source.image)}
          title=""
        >
          {" "}
        </CardMedia>
        <div className={classes.overlay}></div>
        <CardHeader
          title={<span style={{fontWeight:700, fontSize:14}}>{r._source.title}</span>}
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
        />

        <CardContent title="Short description">
          <Typography
            variant="body2"
            color="primary"
            component="div"
            style={{ overflow: "hidden" }}
          >
            {r._source.subtitle.substring(0, 125) + "..."}
            <br></br>
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size='small'
            variant="contained"
            onClick={() => handleExpandClick(r)}
            style={{ borderRadius: 20, backgroundColor:'#A8D9DC', textTransform:'none', left:'60%'}}
            disableElevation
          >
            Learn more
          </Button>
          {/* <IconButton>
         <a href={r._source.url}><OpenInNewIcon aria-label="open new" title="Open Link"/></a> 
        </IconButton>
        <IconButton
          onClick={() => handleExpandClick(r)}
          aria-label="show more" title="Project details"
        >
          <DashboardIcon />
        </IconButton>
         */}
        </CardActions>
      </Card>
    </Fade>
  );
}
