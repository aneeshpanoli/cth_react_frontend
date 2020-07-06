import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 200,
  },
}));

export default function Header({ selectedProject }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <CalendarHeatmap
          startDate={new Date("2016-01-01")}
          endDate={new Date("2017-02-01")}
          values={[
            { date: "2016-01-01", count: 12 },
            { date: "2016-01-22", count: 122 },
            { date: "2016-01-30", count: 38 },
            // ...and so on
          ]}
        />
      </Paper>
    </Grid>
  );
}
