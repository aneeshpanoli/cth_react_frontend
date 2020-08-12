import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import HomeCorousel from "./HomeCarousel";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { esAxios } from "../backend/AxiosRequest";
import { MATCH } from "../backend/EsQueries";
import ProgressBar from "../search/ProgressBar";

const useStyles = makeStyles((theme) => ({
  arrowBtn: {
    backgroundColor: theme.palette.secondary.main,
    margin: "1rem",
  },
}));

// function filterProjectList(projList) {
//   let categs = [];
//   let cat_list = [];
//   projList.forEach((element) => {
//     if (!categs.includes(element._source.category)) {
//       // get all the unique categories
//       categs.push(element._source.category);

//       // filter the es search json and add to list
//       cat_list.push(
//         projList.filter((d) => d._source.category === element._source.category)
//       );
//     }
//   });

//   return cat_list.sort((a, b) => b.length - a.length).slice(0, 4);
// }

// function shuffle(a) {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

export default function FeaturedProjects() {
  const classes = useStyles();
  const [pageNum, setPageNum] = React.useState(3);
  const topDiv = React.useRef(null)
  const categories = [
    "Masks",
    "Telehealth",
    "Vaccine",
    "Personal Protective Equipment",
    "Contact Tracing",
    "Drug Discovery",
    "Symptoms",
    "Home Delivery",
    "Distance Learning",
    "Bioinformatics",
    "Databases",
  ];
  const handleMore = () => {
    setPageNum(pageNum + 3);
    window.scrollTo(0, topDiv.current.offsetTop+topDiv.current.clientHeight);
  };

  return (
    <Box>
      <Container>
        <h3 style={{ fontWeight: 700 }}>FEATURED PROJECTS</h3>
      </Container>
      {categories.slice(0, pageNum).map((r, i) => (
        <Box key={i}  ref={topDiv}>
          <Grid container spacing={2}>
            <HomeCorousel term={r} />
          </Grid>
        </Box>
      ))}
      <Grid container justify="center">
        {pageNum >= categories.length ? null : (
          <Grid item xs={12} align="center" >
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
    </Box>
  );
}
