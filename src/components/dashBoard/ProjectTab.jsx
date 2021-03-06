import React from "react";
import PropTypes from "prop-types";
import { useTrackedState } from "reactive-react-redux";
import TaskCard from "./TaskCard";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import parseHtml from "html-react-parser";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ProjectLinks from "./ProjectLinks";
import ProjectVideo from "./ProjectVideo";
import ProjectTech from "./ProjectTech";
import MTSubmitForm from "./MTSubmitForm";
import Collapse from "@material-ui/core/Collapse";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Button from "@material-ui/core/Button";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  tabPanel: {
    backgroundColor: "white",
  },
}));

export default function ProjectTab(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { authData, microtaskList } = useTrackedState();
  const [openForm, setOpenForm] = React.useState(false);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenForm = () => {
    if (!authData.isAuthenticated) {
      history.push("/sign-in");
      return;
    }
    setOpenForm(!openForm);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Microtasks" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          className={classes.tabPanel}
        >
          <Container >
            <h4 style={{ margin: "0 auto", textAlign: "left" }}>
              Project Tasks
            </h4>
            <hr></hr>
            <Grid container spacing={1}>
              <Grid item sm={12} md={12} xs={12}>
                <AddOutlinedIcon style={{ marginRight: "0.6rem" }} />
                <Button
                  onClick={handleOpenForm}
                  variant="text"
                  style={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}
                >
                  {"  "}
                  New Task
                </Button>
              </Grid>
              <Collapse in={openForm} timeout="auto" unmountOnExit>
                <Grid item sm={12} md={12} xs={12}>
                  <MTSubmitForm
                    openForm={handleOpenForm}
                    selectedProject={props.selectedProject}
                  />
                </Grid>
              </Collapse>
              <Grid item sm={12} md={12} xs={12}>
                {microtaskList &&
                  microtaskList[0] &&
                  microtaskList.map((r, i) => <TaskCard key={i} r={r} />)}
              </Grid>
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          className={classes.tabPanel}
        >
          {props.selectedProject ? (
            <Container>
              <Grid
                container

                // left: "50%",
                // transform: `translateX(-50%)`,
              >
                <Grid item md={12} sm={12} xs={12}>
                  <h4 style={{ margin: "0 auto", textAlign: "left" }}>
                    Project details
                  </h4>
                  <hr></hr>
                  <Typography variant="body1">
                    {parseHtml(
                      props.selectedProject
                        ? props.selectedProject._source.storyText
                        : null
                    )}
                  </Typography>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                  <h2>Resources</h2>
                </Grid>
                <Grid item sm={12} md={6} xs={12}>
                  <ProjectVideo selectedProject={props.selectedProject} />
                </Grid>
                <Grid item sm={12} md={6} xs={12}>
                  <ProjectLinks selectedProject={props.selectedProject} />
                  <ProjectTech selectedProject={props.selectedProject} />
                </Grid>
              </Grid>
            </Container>
          ) : null}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
