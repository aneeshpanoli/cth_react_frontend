import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Header({ selectedProject }) {
  const classes = useStyles();

  const renderChips = () => {
    const chips = [];
    selectedProject._source.builtWith.forEach((element) => {
      chips.push(
        <Chip
          size="small"
          key={element}
          label={element.slice(0, 38)}
          className={classes.chip}
          style={{ margin: 3 }}
        />
      );
    });
    return chips;
  };

  return (
    <Grid item xs={12} sm={12} className={classes.root}>
      {selectedProject &&
      selectedProject._source.builtWith &&
      selectedProject._source.builtWith[0]
        ? renderChips()
        : "No tags found"}
    </Grid>
  );
}
