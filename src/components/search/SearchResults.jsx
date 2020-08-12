import React from "react";
import Container from "@material-ui/core/Container";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "./ProjectCard";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
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
  arrowBtn: {
    backgroundColor: theme.palette.secondary.main,
    margin: "1rem",
  },
  paper: {},
}));

export default function SearchResults() {
  const { filterProjectList, searchProjectList } = useTrackedState();
  const classes = useStyles();
  const [pageNum, setPageNum] = React.useState(12);
  const topDiv = React.useRef(null);
  const [timeOut, setTimeOut] = React.useState()

React.useEffect(()=> setTimeOut(<span>Sorry, No projects found!</span>), [searchProjectList])


  const handleMore = () => {
    setPageNum(pageNum + 12);
    window.scrollTo(0, topDiv.current.offsetTop + topDiv.current.clientHeight);
  };
  return (
    <Container>
      <Grid container spacing={1}>
        {searchProjectList && filterProjectList && filterProjectList[0] ? (
          <Grid item xs={12} sm={12} align="center">
            <span>
              We found{" "}
              {searchProjectList.length >= 1000
                ? "1000+"
                : searchProjectList.length}{" "}
              projects!
            </span>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} align="center">
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
            ? filterProjectList.slice(0, pageNum).map((r, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} ref={topDiv}>
                  <ProjectCard r={r} />
                </Grid>
              ))
            : null}
          <Grid container justify="center">
            {!filterProjectList ||
            pageNum >= filterProjectList.length ? null : (
              <Grid item xs={12} align="center">
                Load more
                <IconButton
                  size="small"
                  className={classes.arrowBtn}
                  onClick={handleMore}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
