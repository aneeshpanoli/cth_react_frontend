import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SelectFiled from './SelectField';
import DateTimePicker from './DateTimePicker'
import TitleField from './SinglelineText'
import DescriptionField from './MultilineText'
import ProjectCard from '../home/ProjectCardPreview'

import ConfirmPost from '../dialogue/ConfirmPost'
import PublishIcon from '@material-ui/icons/Publish';


const tutorialSteps = [
  {
    label: 'Select a primary area',
    fieldElement: <SelectFiled 
    id="primeArea"/>
  },
  {
    label: 'Enter a title for the project',
    fieldElement:<TitleField 
    id="title" />
  },
  {
    label: 'Select a dealline',
    fieldElement:<DateTimePicker 
    id="dateTime" />
  },
  {
    label: 'Enter a project description',
    fieldElement:<DescriptionField 
    placeHolder="Enter a description"
    id='description'
  />,
  },
  
  {
    label: 'Enter the procedure',
    fieldElement:<DescriptionField 
    placeHolder="Enter the procedure"
    id='procedure'
  />,
  },
  {
    label: 'Review the detiils',
    fieldElement:<ProjectCard />,
    id:'review'
  },
];

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
  const maxSteps = tutorialSteps.length;
  const { projectFormData } = useTrackedState();

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
       <div>
        <h1>Create a challenge</h1>
        <hr ></hr>
        
   </div>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant='h6'>
          {tutorialSteps[activeStep].label}
          </Typography>
      </Paper>
      {tutorialSteps[activeStep].fieldElement}
      
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
          color='secondary'
          startIcon={<PublishIcon />}
          > Submit </ConfirmPost>
          :
          <Button size="small" onClick={handleNext} variant='contained'
          color={activeStep === maxSteps - 1 ? 'secondary': 'primary'}>
             'Next'
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
