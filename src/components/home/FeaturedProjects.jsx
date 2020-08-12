import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import SearchCorousel from "./Carousel";
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

function filterProjectList(projList) {
  let categs = [];
  let cat_list = [];
  projList.forEach((element) => {
    if (!categs.includes(element._source.category)) {
      // get all the unique categories
      categs.push(element._source.category);

      // filter the es search json and add to list
      cat_list.push(
        projList.filter((d) => d._source.category === element._source.category)
      );
    }
  });

  return cat_list.sort((a, b) => b.length - a.length).slice(0, 4);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


export default function FeaturedProjects() {
  const classes = useStyles();
  const [filteredProjList, setFilteredProjList] = React.useState([]);

  const history = useHistory();
  const allCategories = shuffle([
    "Masks",
    "Vaccine",
    "Personal Protective Equipment",
    "Contact Tracing",
    "Drug Discovery",
    "Symptoms",
    "Home Delivery",
    "Distance Learning"
  ]);
  const handleMore = () => {
    setCategories(allCategories.slice(0, categories.length+3))
  };
  const [categories, setCategories] = React.useState(allCategories.slice(0, 3))


  return (

        <Box>
          <Container>
            <h3 style={{ fontWeight: 700 }}>FEATURED PROJECTS</h3>
          </Container>
          {categories.map((r, i) => (
            <Box key={i}>
              <Grid container spacing={2}>

                  <SearchCorousel term={r} />
                
              </Grid>
            </Box>
          ))}
          <Grid container justify="center">
            {categories.length === allCategories.length?null:
            <Grid item xs={12} align="center">
                Load more
                <IconButton size="small" className={classes.arrowBtn} onClick={handleMore}>
                  <ArrowDownwardIcon />
                </IconButton>
              
            </Grid>}
          </Grid>
        </Box>
  );
}
