import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import GitHubIcon from '@material-ui/icons/GitHub';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ActivityProject from './activityProject';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab title="Project" icon={<BusinessCenterIcon />} {...a11yProps(0)} />
          <Tab title="GitHub" icon={<GitHubIcon />} {...a11yProps(1)} />
          <Tab title="People" icon={<PersonAddIcon />} {...a11yProps(2)} />
          <Tab title="Likes" icon={<FavoriteIcon />} {...a11yProps(3)} />
      </Tabs>
    </Paper>
    <TabPanel value={value} index={0}>
    <ActivityProject />
  </TabPanel>
  <TabPanel value={value} index={1}>
    Item Two
  </TabPanel>
  <TabPanel value={value} index={2}>
    Item Three
  </TabPanel>
  <TabPanel value={value} index={3}>
    Item Four
  </TabPanel>
  </div>
  );
}
