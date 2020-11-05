import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { Typography, Grid, Tooltip } from "@material-ui/core";
import LongMenu from "../menu/LongMenu";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateSelectedProject, updateAuthData } from "../redux/actions";
import { useHistory } from "react-router-dom";
import { getImgUrl } from "../js/utils";
import Link from "@material-ui/core/Link";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { postPostAuthAxios } from "../backend/AxiosRequest";

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
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  const [upvotes, setUpvotes] = React.useState([]);
  const [downvotes, setDownvotes] = React.useState([]);
  const { authData } = useTrackedState();
  const [selectedProject, setSelectedProject] = React.useState(props.r);

  React.useEffect(() => setSelectedProject(props.r), [props.r]);
  React.useEffect(() => {
    if (selectedProject && selectedProject._source.downvotes) {
      setDownvotes(selectedProject._source.downvotes);
    }
    if (selectedProject && selectedProject._source.upvotes) {
      setUpvotes(selectedProject._source.upvotes);
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
    if (selectedProject) {
      dispatch(updateSelectedProject(selectedProject));

      history.push(
        "/" +
          selectedProject._source.title.replace(/\s+/g, "-") +
          "/" +
          selectedProject._id
      );
    }
  };

  const isBookmarked = authData.user
    ? selectedProject._source.bookmarks &&
      selectedProject._source.bookmarks.includes(authData.user.id)
    : false;

  const getBookMarkList = (userId, array) => {
    if (isBookmarked) {
      const index = array.indexOf(userId);
      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    } else {
      return array ? array.concat([userId]) : [userId];
    }
  };

  const bookMark = () => {
    if (!authData || !authData.user) {
      history.push("/sign-in");
      return;
    }
    const bookmarkList = getBookMarkList(
      authData.user.id,
      selectedProject._source.bookmarks
    );
    let data = {
      status: "projectvote",
      index: selectedProject._index,
      id: selectedProject._id,
      q: {
        doc: {
          bookmarks: bookmarkList,
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
    const postpostAuthAxios = postPostAuthAxios(`Token ${authData.key}`);
    postpostAuthAxios
      .post(`/post/`, formData)
      .then((response) => {
        console.log(response.data.get._source);
        console.log(authData.user.id);
        setSelectedProject({
          ...selectedProject,
          _source: response.data.get._source,
        });
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
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
      key={selectedProject._id}
      style={{ transitionDelay: checked ? "300ms" : "0ms" }}
    >
      <Grid container spacing={1}>
        <Grid item md={2} sm={3} xs={4}>
          <img
            src={getImgUrl(selectedProject._source.image)}
            className={classes.media}
          />
        </Grid>

        <Grid item md={10} sm={9} xs={8}>
          <Link
            // onMouseMove={() => setMouseMoved(true)}
            // onMouseDown={() => setMouseMoved(false)}
            onClick={() => handleLearnmore(selectedProject)}
            href={
              "/" +
              selectedProject._source.title.replace(/\s+/g, "-") +
              "/" +
              selectedProject._id
            }
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Grid item xs={12}>
              <Typography variant="h6">
                {selectedProject._source.title} {bull}{" "}
                <Typography variant="body2" component="span">
                  {selectedProject._source.hackathons[0]
                    ? selectedProject._source.hackathons[0]
                    : null}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {/* {selectedProject._source.subtitle.substring(0, 125) + "..."} */}
                {selectedProject._source.subtitle}
              </Typography>
            </Grid>
          </Link>
          <Grid container>
            <Grid item xs={12}>
              {" "}
              <span style={{ display: "flex", margin: "1rem" }}>
                {makeChip()}
                <Tooltip arrow title="Bookmark">
                  <IconButton
                    variant=""
                    onClick={bookMark}
                    size="small"
                    style={{ margin: "auto 1rem" }}
                  >
                    <TurnedInIcon
                      color={isBookmarked ? "primary" : "secondary"}
                    />
                  </IconButton>
                </Tooltip>
                <LongMenu r={selectedProject} esIndex="projects" />
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr></hr>
        </Grid>
      </Grid>
    </Fade>
  );
}
