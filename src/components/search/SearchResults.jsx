import React from "react";
import Box from "@material-ui/core/Box";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "./ProjectCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SearchFilter from "./SearchFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: "auto",
    margin: "0.3rem",
  },
  paper: {},
}));

export default function SearchResults() {
  const { filterProjectList } = useTrackedState();
  const classes = useStyles();

  return (
    // <Container maxwidth="lg" ref={resultDiv}>
    <Grid container spacing={1} justify="space-around" direction="row">
      <Grid item xs={12} sm={12}>
        <Box justifyContent="center">
          <Card className={classes.root} variant="outlined">
            {filterProjectList ? <SearchFilter /> : null}
          </Card>
        </Box>
      </Grid>
      {filterProjectList && filterProjectList[0] ? (
        <span>
          1 - {filterProjectList.length}/{filterProjectList.length}
        </span>
      ) : (
        <span>Sorry, No projects found!</span>
      )}
      <Grid item xs={12} sm={12} container wrap="wrap" spacing={1}>
          {filterProjectList && filterProjectList[0]
            ? filterProjectList.map((r, i) => (
                <Grid item key={i} xs={12} sm={6} md={3}>
                  <ProjectCard r={r} />
                </Grid>
              ))
            : null}
      </Grid>
    </Grid>
  );
}
