import React, {useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SelectFiled from './SelectField';
import DateTimePicker from './DateTimePicker'
import MultilineText from './MultilineText'
import ProjectCard from './ProjectCardPreview'
import ConfirmPost from './ConfirmPost'
import PublishIcon from '@material-ui/icons/Publish';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function TextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 6;
  const [element, setElement] = React.useState(null)

  const makeFormElement = (message, form) => {
      return <React.Fragment>
      <Paper square elevation={0} className={classes.header}>
          <Typography variant='h6'>
             {message}
         </Typography>
      </Paper>
      {form}
      
    </React.Fragment>;
  }
  const getElement = (activeStep) =>{
    switch (activeStep) {
      case 0:
        return makeFormElement
              ('Select a primary area', 
                <SelectFiled 
                      id="primeArea"
                  />
              )
 
      case 1:
        return makeFormElement
              ('Enter a title for the project',  
                <MultilineText 
                  id='title'
                />
              )
      case 2:
        return makeFormElement
              ('Select a dealline',  
              <DateTimePicker 
              id="dateTime" 
              />
              )
      case 3:
        return makeFormElement
              ('Enter a project description',  
              <MultilineText 
              id="description" 
              />
              )
      case 4:
        return makeFormElement
              ('Enter the procedure',  
              <MultilineText 
              id="procedure" 
              />
              )
      case 5:
        return makeFormElement
              ('Review',  
              <ProjectCard 
              id="review" 
              />
              )

      default:
        return 'Unknown step';
    }
  }
  
  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() =>  setElement(getElement(activeStep)), [activeStep]);

  return (
    <div className={classes.root}>
       <div>
        <h1>Create a challenge</h1>
        <hr ></hr>
        
   </div>
      {element}
    
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <React.Fragment>
          {activeStep === maxSteps - 1 ?
          <ConfirmPost 
          variant="contained"
          color='primary'
          startIcon={<PublishIcon />}
          > Submit </ConfirmPost>
          :
          <Button size="small" onClick={handleNext} variant='contained'
          color={activeStep === maxSteps - 1 ? 'secondary': 'primary'}>
             Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
          }
          </React.Fragment>
        }
        backButton={
          <Button size="small" variant='contained' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
      {activeStep === maxSteps - 1 ?
      null:<ProjectCard />}
      
    </div>
  );
}
