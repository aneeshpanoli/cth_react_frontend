import React from "react";
import Container from "@material-ui/core/Container";
import HomeCorousel from "./HomeCarousel";
import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TuneIcon from "@material-ui/icons/Tune";
import { Button, IconButton } from "@material-ui/core";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { useHistory } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import { CircularProgress } from '@material-ui/core';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import CloseIcon from "@material-ui/icons/Close";
import ChipInput from "material-ui-chip-input";
import { toTitleCase } from "../js/utils";
import ProgressBar from "../search/ProgressBar";
import { updateAuthData, updateProgress } from "../redux/actions";
import {
  updateUserInterests
} from "../backend/AxiosRequest";

const useStyles = makeStyles((theme) => ({
  arrowBtn: {
    backgroundColor: theme.palette.secondary.main,
    margin: "1rem",
  },
  chip: {
    margin: theme.spacing(0.5),
    variant: "outlined",
    height: "1.5rem",
    color: theme.palette.primary.main,
    border: "1px solid",
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
  const dispatch = useDispatch();
  
  const [pageNum, setPageNum] = React.useState(3);
  const topDiv = React.useRef(null);
  const { authData } = useTrackedState();
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const history = useHistory();
  const [grow, setGrow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    interests: [],
    disabled: true,
  });
  const baseCats = [
    "Masks",
    "Telehealth",
    "Artificial Intelligence",
    "Vaccine",
    "Personal Protective Equipment",
    "Contact Tracing",
    "Drug Discovery",
    "Robotics",
    "Symptoms",
    "Home Delivery",
    "Distance Learning",
    "Bioinformatics",
    "Databases",
  ];
  const [categories, setCategories] = React.useState([]);

  const handleMore = () => {
    setLoading(true)
    setTimeout(()=>setLoading(false), 2000)
    setPageNum(pageNum + 3);
    window.scrollTo(0, topDiv.current.offsetTop + topDiv.current.clientHeight);
  };

  React.useEffect(() => setProgress(isProgress), [isProgress]);

  const handlePersonalize = () => {
    if (!authData._source && !authData.isAuthenticated) {
      history.push("/sign-in");
      return;
    } else if (
      authData._source &&
      authData._source.interests &&
      authData._source.interests.length > 0
    ) {
      setFormValues({ interests: authData._source.interests, disabled: true });
      setGrow(true);
    } else {
      setGrow(true);
    }
  };

  const handleDeleteChip = (chip, objProp) => {
    let newArr = [...formValues[objProp]].filter((item) => item !== chip);
    setFormValues(
      Object.assign({}, formValues, { [objProp]: newArr, disabled: false })
    );
  };

  const handleAddChip = (field, values) => {
    // copy new values to formValues
    setFormValues({ ...formValues, [field]: values, disabled: false });
  };

  const updateData = (hit) => {
    dispatch(updateAuthData({ ...authData, _source: hit._source }));
    dispatch(updateProgress(false));
  };

  const saveInterests = () => {
    let data = {
      status: "userupdates",
      index: "user_data",
      id: authData._id,
      q: {
        doc: {
          interests: formValues.interests,
          lastUpdatedAt: new Date(),
        },
      },
    };
    let formData = new FormData();
    formData.append("params", JSON.stringify(data));
    updateUserInterests(formData, authData.key, updateData);
  };

  const handleSave = () => {
    dispatch(updateProgress(true));
    saveInterests();
    setGrow(false);
  };

  const setInterests = (authData) =>{
    if (
      authData._source &&
      authData._source.interests &&
      authData._source.interests.length > 0
    ) {
      setCategories(authData._source.interests);
    } else {
      setCategories(baseCats);
    }
    if (!authData.isAuthenticated) {
      setGrow(false);
    }
  }

  React.useEffect(() => {
    
    const timer = setTimeout(() => {
      setInterests(authData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [authData]);

  return (
    <Box>
      <Container>
        <Grid container alignContent="space-between">
          <Grid item xs={6} sm={6} md={6}>
          <h4 style={{ fontWeight: 700 }}>
            <FeaturedPlayListOutlinedIcon /> {" "}
              Popular topics
            </h4>
          </Grid>
          <Grid item xs={6} sm={6} md={6} align="right">
            <Button
              onClick={handlePersonalize}
              startIcon={<TuneIcon />}
              style={{ color: "grey", fontWeight: 700, textTransform:'none' }}
            >
              Customize feed
            </Button>
          </Grid>
          {progress ? <ProgressBar /> : null}
        </Grid>
        <Collapse in={grow}>
          <Grid container>
            <Grid item xs={6} sm={6} md={9}>
              Enter your interests to personalize the homepage feed.
            </Grid>
            <Grid item xs={6} sm={6} md={3} align="right">
              <IconButton onClick={() => setGrow(false)} color="primary">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ChipInput
                value={formValues.interests}
                classes={{
                  chip: classes.chip,
                }}
                fullWidth
                label="Tap enter to add more"
                onAdd={(chip) => {
                  handleAddChip(
                    "interests",
                    [...formValues.interests].concat([toTitleCase(chip)])
                  );
                }}
                onDelete={(chip, index) => handleDeleteChip(chip, "interests")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} align="right">
              <Button
                disabled={formValues.disabled}
                onClick={handlePersonalize}
              >
                Cancel
              </Button>
              <Button disabled={formValues.disabled} onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Container>
      {categories.slice(0, pageNum).map((cat, i) => (
        <Box key={i} ref={topDiv}>
          <Grid container spacing={2}>
            <HomeCorousel term={cat} />
          </Grid>
        </Box>
      ))}
      <Grid container justify="center">
        {pageNum >= categories.length ? null : (
          <Grid item xs={12} align="center">
            Load more
            <IconButton
              size="small"
              className={classes.arrowBtn}
              onClick={handleMore}
            >
              {loading? <CircularProgress size={20}/>: <ArrowDownwardIcon />}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
