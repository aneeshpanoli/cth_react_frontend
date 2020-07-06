import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useTrackedState } from "reactive-react-redux";
import SelectedFilterChips from "./SelectedFilterChips";
import AvailableFilterChips from "./AvailableFilterChips";
import FilterListIcon from "@material-ui/icons/FilterList";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeSet } from '../js/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));




export default function NestedList() {
  const classes = useStyles();
  const { searchProjectList } = useTrackedState();

  const [collapseStates, setCollapseStates] = React.useState({
    open: false,
    open1: false,
  });

  const [ availableBuiltWith, setAvailableBuiltWith ] = React.useState();

  useEffect(()=>{
    const builtWithSet = makeSet(searchProjectList);
    const chipDict = [...builtWithSet].sort().map((x, i) =>({key:i, label:x}) );
    console.log(chipDict)
    setAvailableBuiltWith(
      chipDict
    )
  },[searchProjectList])

  const handleClick = (c_state) => {
    let newDict = { ...collapseStates };
    newDict[c_state] = !newDict[c_state];
    setCollapseStates(newDict);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={() => handleClick("open")}>
        <ListItemIcon>
          <FilterListIcon />
        </ListItemIcon>
        <ListItemText primary="Filter results" />

        {collapseStates.open ? <CancelIcon /> : <ExpandMore />}
      </ListItem>

      <Collapse in={collapseStates.open} timeout="auto" unmountOnExit>
        <Divider variant="inset" />
        <ListItem button onClick={() => handleClick("open1")}>
          <ListItemText primary="Technology" />

          {collapseStates.open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <SelectedFilterChips />
        <Divider variant="middle" />

        <Collapse in={collapseStates.open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <AvailableFilterChips />
          </List>
        </Collapse>
      </Collapse>
    </List>
  );
}
