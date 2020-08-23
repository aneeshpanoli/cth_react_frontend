import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    wordWrap: "break-word",
    backgroundColor:theme.palette.secondary.main,
    borderRadius:10,
  },

}));

export default function Header({ selectedProject }) {
  const classes = useStyles();

  const renderLinks = () => {
    const all_links = [...selectedProject._source.links];
    all_links.push(
      selectedProject._source.url ? selectedProject._source.url : null
    );
    // console.log(all_links)
    const elements = [];
    let newUrl;
    all_links.forEach((element, i) => {
      try {
        newUrl = new URL(element).hostname.slice(0, 31);
        elements.push(
          <Button
            key={i}
            startIcon={<LinkIcon />}
            target="_blank"
            size="small"
            href={element}
            style={{ margin: 5 }}
          >
            {newUrl}
          </Button>
        );
      } catch (error) {}
    });
    return elements;
  };

  return (
    <Grid item xs={12} sm={12} className={classes.root}>
        {selectedProject && selectedProject._source.links
          ? renderLinks()
          : "This project has no links"}
    </Grid>
  );
}
