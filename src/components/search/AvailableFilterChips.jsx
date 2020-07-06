import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateFilterProject } from '../redux/actions'
import { makeSet } from '../js/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray() {
  const classes = useStyles();
  const { searchProjectList } = useTrackedState();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  useEffect(()=>{
    const builtWithSet = makeSet(searchProjectList);
    const chipDict = [...builtWithSet].sort().map((x, i) =>({key:i, label:x}) );
    console.log(chipDict)
    setChipData(
      chipDict
    )
  },[searchProjectList])
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    
  };

  return (
    <div className={classes.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>

            <Chip
            size="small"
              icon={icon}
              label={data.label}
              clickable
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
              onClick={data.label === 'React' ? undefined : handleDelete(data)}
              className={classes.chip}
              deleteIcon={<DoneIcon />}
            />
          </li>
        );
      })}
      </div>
  );
}
