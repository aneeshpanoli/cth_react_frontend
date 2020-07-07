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
import { useTrackedState, useDispatch } from "reactive-react-redux";
import SelectedFilterChips from "./SelectedFilterChips";
import AvailableFilterChips from "./AvailableFilterChips";
import FilterListIcon from "@material-ui/icons/FilterList";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeCountDictStr, makeCountDictArr, sortStringObjArr } from '../js/utils'
import {  updateFilterProject } from '../redux/actions'


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
  const dispatch = useDispatch();
  const { searchProjectList } = useTrackedState();

  const [collapseStates, setCollapseStates] = React.useState({
    open: false,
    open1: false,
    open2: false,
  });

  const [ availableBuiltWith, setAvailableBuiltWith ] = React.useState([]);
  const [ selectedBuiltWith, setSelectedBuiltWith ] = React.useState([]);
  const [ availableCategories, setAvailableCategories ] = React.useState([]);
  const [ selectedCategories, setSelectedCategories ] = React.useState([]);

  useEffect(()=>{
    console.log("making counts dict");
    const builtWith = makeCountDictArr(searchProjectList, 'builtWith');
    const categories = makeCountDictStr(searchProjectList, 'category');
    // set map [...categories].sort().map((x, i) =>({key:i, label:x}) )
    // convert set to list and sort and make json
    // we want the tags to update with this useEffect
    // console.log(chipDict)
    setAvailableBuiltWith(sortStringObjArr(builtWith))
    setAvailableCategories(sortStringObjArr(categories));

    // setAvailableCategories(categories.sort((a, b) => b.value - a.value));
  },[searchProjectList])

  
  const handleDeleteSelected = (chipToDelete) => () => {
    setSelectedBuiltWith((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    setAvailableBuiltWith(sortStringObjArr([...availableBuiltWith, chipToDelete]));

  }


  const handleDeleteAvailable = (chipToDelete) => () => {
    setAvailableBuiltWith((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    setSelectedBuiltWith(sortStringObjArr([...selectedBuiltWith, chipToDelete]));
  }

  const handleDeleteSelected1 = (chipToDelete) => () => {
    setSelectedCategories((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    setAvailableCategories(sortStringObjArr([...availableCategories, chipToDelete]));    
  }


  const handleDeleteAvailable1 = (chipToDelete) => () => {
    setAvailableCategories((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    setSelectedCategories(sortStringObjArr([...selectedCategories, chipToDelete]));
  }

  useEffect(() => {
      const newD = searchProjectList.filter((d) => 
      selectedBuiltWith.every(v =>  d._source.builtWith.includes(v.label)))
      dispatch(updateFilterProject(newD))
}, [selectedBuiltWith]);

useEffect(() => {
    const newD1 = searchProjectList.filter((d) => 
    selectedCategories.every(v =>  d._source.category === v.label));
    dispatch(updateFilterProject(newD1))
}, [selectedCategories]);



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
        <SelectedFilterChips data={selectedBuiltWith} onDelete={handleDeleteSelected}/>
        

        <Collapse in={collapseStates.open1} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
          <List component="div" disablePadding>
            <AvailableFilterChips data={availableBuiltWith} onDelete={handleDeleteAvailable}/>
          </List>
        </Collapse>


        <Divider variant="inset" />
        <ListItem button onClick={() => handleClick("open2")}>
          <ListItemText primary="Categories" />

          {collapseStates.open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <SelectedFilterChips data={selectedCategories} onDelete={handleDeleteSelected1}/>
        

        <Collapse in={collapseStates.open2} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
          <List component="div" disablePadding>
            <AvailableFilterChips data={availableCategories} onDelete={handleDeleteAvailable1}/>
          </List>
        </Collapse>
      </Collapse>
    </List>
  );
}
