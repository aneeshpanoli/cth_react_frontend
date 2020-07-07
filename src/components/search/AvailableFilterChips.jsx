import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';


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

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);
  useEffect(()=>setChipData(props.data), [props.data])
  

  return (
    <div className={classes.root}>
      {chipData.map((data) => {

        return (
          <li key={data.label}>

            <Chip
            size="small"
        avatar={<Avatar>{data.key}</Avatar>}
              label={data.label}
              clickable
              onDelete={props.onDelete(data)}
              onClick={props.onDelete(data)}
              className={classes.chip}
              deleteIcon={<DoneIcon />}
            />
          </li>
        );
      })}
      </div>
  );
}
