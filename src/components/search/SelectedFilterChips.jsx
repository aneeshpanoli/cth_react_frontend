import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    maxHeight: '65vh',
    overflowY: 'auto'
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
            variant="outlined"
            size="small"
              clickable
              color="primary"
              avatar={<Avatar>{data.key}</Avatar>}
              label={data.label}
              onDelete={props.onDelete(data)}
              onClick={props.onDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
      </div>
  );
}
