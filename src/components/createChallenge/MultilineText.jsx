import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateProjectFormData } from '../redux/actions'
import { useDispatch, useTrackedState } from 'reactive-react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const dispatch = useDispatch();
  const { challengeFormData } = useTrackedState();

  const handleChange = (value, id) => {
    challengeFormData[id] = value;
    dispatch(updateProjectFormData(challengeFormData));
    console.log(id);
  };



  return (
    <form className={classes.root} noValidate autoComplete="off">
      
        <TextField
          required={true}
          id={props.id}
          label="Required"
          multiline
          onChange={(e) => handleChange(e.target.value, props.id)}
          rowsMax={Infinity}
          fullWidth={true}
          placeholder={props.placeHolder}
          key={challengeFormData[props.id]}
          defaultValue={challengeFormData[props.id]}
        />
      
    </form>
  );
}
