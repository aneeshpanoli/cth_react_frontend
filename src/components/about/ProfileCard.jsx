import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderTop: "10px solid #1C3557",
    borderBottom: "3px solid silver",
  },
  media: {
    height: 300,
  },
  buttons: {
    textTransform: "none",
    fontSize: "0.9rem",
    color: "#2D7DC1",
  },
  actionArea: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

export default function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="left">
            {props.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2" align="left">
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="left"
          >
            {props.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          className={classes.buttons}
          startIcon={<LinkedInIcon />}
          href={props.linkedin}
        >
          Connect
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.buttons}
          startIcon={<TwitterIcon />}
          href={props.twitter}
        >
          Follow
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.buttons}
          startIcon={<MessageOutlinedIcon />}
        >
          Message
        </Button>
      </CardActions>
    </Card>
  );
}
