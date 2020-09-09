import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { Typography, Grid } from "@material-ui/core";
import LongMenu from "../menu/LongMenu";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateSelectedProject } from "../redux/actions";
import { useHistory } from "react-router-dom";
import { getImgUrl } from "../js/utils";
import Link from "@material-ui/core/Link";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Chip from "@material-ui/core/Chip";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButton, Button} from '@material-ui/core';
import ProjectSettings from './ProjectSettings'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    border: "1px solid #E8E8E8",
    borderRadius: 15,
  },
  media: {
    maxHeight: "auto",
    maxWidth: "100%",
    minHeight: "5rem",
    minWidth: "5rem",
    objectFit: "cover",
    borderRadius: 5,
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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
}));

export default function SearchCard(props) {
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
        selectedProject._source.projectTitle.replace(/\s+/g, "-") +
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
          size="small"
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    } else if (authData._source && downvotes.includes(authData._source.id)) {
      return (
        <Chip
          className={classes.chipRed}
          size="small"
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    } else {
      return (
        <Chip
          className={classes.chipGrey}
          size="small"
          icon={<ThumbUpIcon />}
          label={percentLikes()}
        />
      );
    }
  };
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Fade
      timeout={600}
      in={checked}
      key={props.r._id}
      style={{ transitionDelay: checked ? "300ms" : "0ms" }}
    >
<React.Fragment>

        <Grid item md={12} sm={12} xs={12} align='left' noW>
            <Grid item xs={12}>
            <CheckBoxOutlineBlankIcon style={{ marginRight: "1rem" }}/>
            <Link
            onMouseMove={() => setMouseMoved(true)}
            onMouseDown={() => setMouseMoved(false)}
            onMouseUp={() => handleLearnmore(props.r)}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Typography component='span' style={{fontWeight:700, fontSize:'1.2rem'}}>
            {props.r._source.title} {bull}{" "}
                <Typography variant="body2" component="span">
                  {props.r._source.category ?props.r._source.category
                    : null} 
                </Typography>
                
              </Typography>
              </Link>
              
              <Typography style={{ marginLeft: "2.5rem" }}>
                {/* {props.r._source.subtitle.substring(0, 125) + "..."} */}
                {props.r._source.subtitle ? props.r._source.subtitle : null}
              </Typography>
              <Button style={{marginLeft: "1.5rem", color:'green'}}>Solve</Button>
             <IconButton style={{marginLeft: "1rem", color:'silver'}}><TurnedInNotOutlinedIcon  /></IconButton> 
             
            
            
            <IconButton><ExpandMoreIcon style={{marginLeft: "auto 1.5rem", color:'silver'}} /></IconButton>
            <ProjectSettings selectedProject={props.r} style={{marginLeft: "auto 1.5rem", color:'silver'}} />
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr></hr>
        </Grid>
        </React.Fragment>
    </Fade>
  );
}
