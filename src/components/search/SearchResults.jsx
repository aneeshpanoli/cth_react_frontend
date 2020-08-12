import React from "react";
import Container from "@material-ui/core/Container";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "./ProjectCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SearchFilter from "./SearchFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "0.3rem",
    borderRadius: 12,
    overflowX: "hidden",
  },
  paper: {},
}));

export default function SearchResults() {
  const { filterProjectList } = useTrackedState();
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={1}>
        {filterProjectList && filterProjectList[0] ? (
          <Grid item xs={12} sm={12} align="center">
            <span>
              1 - {filterProjectList.length}/{filterProjectList.length}
            </span>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} align="center">
            <span>Sorry, No projects found!</span>
          </Grid>
        )}

        {/* filter and results */}
        <Grid item xs={12} sm={4} md={3}>
          <Card className={classes.root} variant="outlined">
            {filterProjectList ? <SearchFilter /> : null}
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          container
          wrap="wrap"
          spacing={1}
          justify="center"
        >
          {filterProjectList && filterProjectList[0]
            ? filterProjectList.map((r, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <ProjectCard r={r} />
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Container>
  );
}
