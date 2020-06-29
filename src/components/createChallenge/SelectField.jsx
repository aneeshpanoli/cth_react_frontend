import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { updateChallengeFormData } from '../redux/actions'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { challengeFormData } = useTrackedState();
  const handleChange = (event) => {
    challengeFormData.primeArea = event.target.value
    dispatch(updateChallengeFormData(challengeFormData));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Area of Study</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={challengeFormData.primeArea}
          onChange={handleChange}
          
        >
          <MenuItem value={'Web development'}>Web development</MenuItem>
          <MenuItem value={'Art'}>Art</MenuItem>
          <MenuItem value={'Text'}>Text</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
