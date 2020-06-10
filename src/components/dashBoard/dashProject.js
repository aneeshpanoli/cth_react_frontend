import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React from 'react';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'space-between',
    
  },

}));

function wordFreq(string) {
  let stopwords = ['i','me','my','myself','we','our','ours','ourselves',
  'you','your','yours','yourself','yourselves','he','him','his','himself',
  'she','her','hers','herself','it','its','itself','they','them','their',
  'theirs','themselves','what','which','who','whom','this','that','these',
  'those','am','is','are','was','were','be','been','being','have','has','had',
  'having','do','does','did','doing','a','an','the','and','but','if','or',
  'because','as','until','while','of','at','by','for','with','about','against',
  'between','into','through','during','before','after','above','below','to','from',
  'up','down','in','out','on','off','over','under','again','further','then','once',
  'here','there','when','where','why','how','all','any','both','each','few','more',
  'most','other','some','such','no','nor','not','only','own','same','so','than','too',
  'very','s','t','can','will','just','don','should','now']
  let words = string.replace(/[.]/g, '')
    .split(/\s/);
  words = words.filter(a => !stopwords.includes(a.toLowerCase() ));
   return words.reduce((map, word) => 
      Object.assign(map, {
        [word]: (map[word])
          ? map[word] + 1
          : 1,
      }),
      {}
    );
  }



export default function DashProject() {
  const classes = useStyles();
  const { selectedProject } = useTrackedState();
  if (selectedProject){
   console.log(wordFreq(selectedProject._source.storyText));


  return (

    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}  component="div" ><h2>{selectedProject._source.title}</h2>
          <Button variant="contained" color="primary">
        Claim Project
      </Button>
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper} elevation={0}>{selectedProject._source.storyText}</Paper>
        </Grid>
        <Grid className="border-left" item xs={1} style={{
          display: "flex",
          flexDirection: "column"
        }}>
        <IconButton aria-label="add to favorites" title="Like">
          <FavoriteIcon />
        </IconButton> 
        <IconButton aria-label="share" title="Share">
          <ShareIcon />
        </IconButton>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={0}>{selectedProject._source.builtWith.join(", ")}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>{selectedProject._source.country}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>{selectedProject._source.links.join("\n ")}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}  component="div" ><h2>Team Members</h2>
 
          </Paper>
        </Grid>
      </Grid>
    </div>
  );}else{
      return (
          <div>Loading...</div>
      )
    }
}
