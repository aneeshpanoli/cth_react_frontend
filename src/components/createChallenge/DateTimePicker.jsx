import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { updateChallengeFormData } from '../redux/actions'
import { useDispatch, useTrackedState } from 'reactive-react-redux';


export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(today);
  const dispatch = useDispatch();
  const {challengeFormData} = useTrackedState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    challengeFormData['deadLine'] = selectedDate;
    dispatch(updateChallengeFormData(challengeFormData));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
     
       <KeyboardDatePicker
          minDate={today}
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          minDate={today}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
