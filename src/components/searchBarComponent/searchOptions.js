import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function searchOptions(){

    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };
  
    return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
  >

 
      <FormControl className={classes.formControl} variant="filled" >
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          name="age"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
        >
          <option value="">Select</option>
          <option value={10}>Ingredients</option>
          <option value={20}>Cook time</option>
          <option value={30}>Course</option>
        </NativeSelect>
        {/* <FormHelperText>With visually hidden label</FormHelperText> */}
      </FormControl>

    </Grid>   

  );
}
