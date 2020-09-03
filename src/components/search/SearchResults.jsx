import React from "react";
import Container from "@material-ui/core/Container";
import { useTrackedState } from "reactive-react-redux";
import SearchCard from "./SearchCard";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SearchFilter from "./SearchFilter";
import Head from "../meta/Head";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    borderRadius: 12,
    overflowX: "hidden",
    position: "-webkit-sticky",
    position: "sticky",
    top: "4.5rem",
    overflow: "visible",
  },
  filterGrid: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "0rem",
    overflow: "visible",
    zIndex: 5,
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

  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [filterTop]);

  const handleMore = () => {
    setPageNum(pageNum + 12);
    window.scrollTo(0, topDiv.current.offsetTop + topDiv.current.clientHeight);
  };
  return (
    <Container>
      <Head image={searchProjectList&&searchProjectList[0]?searchProjectList[0]._source.image:null}/>
      <Grid container spacing={1} style={{marginTop:'2%'}}>

        {/* filter and results */}
        <Grid item xs={12} sm={4} md={3} className={classes.filterGrid}>
          {searchProjectList&&filterProjectList ? (
            <Card className={classes.root} variant="outlined">
               <Grid item xs={12} sm={12} align="center">
                {searchProjectList.length >= 1000
                  ? "1,000+"
                  : searchProjectList.length}{" "}
                project results.
              </Grid>
              <SearchFilter />
            </Card>
          ) : null}
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
                // <Grid item key={i} xs={12} sm={6} md={4} ref={topDiv}>
                <Grid item key={i} xs={12} sm={12} md={12} ref={topDiv}>
                  <SearchCard r={r} />
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
