import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'visible',
    width: '100%',
    justifyContent:'flex-end',
  },
  paper: {
    display: 'table-cell',
    height: '10rem',
    width: '100%',
    overflow: 'visible',
    backgroundColor: "transparent",
    verticalAlign:"middle",
    
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function FooterGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Box className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={spacing}>
            <Grid >
              <div className={classes.paper} >
                <Button
                startIcon={ <LinkedInIcon />}
                style={{textTransform: 'none'}}
                >
                  LinkedIn
                </Button>
                
                <br></br>
                <Button
                startIcon={ <InstagramIcon />}
                style={{textTransform: 'none'}}
                >
                  Instagram
                </Button>
               
                <br></br>
                <Button
                startIcon={ <FacebookIcon />}
                style={{textTransform: 'none'}}
                >
                  Facebook
                </Button>
               
                <br></br>
                <Button
                startIcon={ <TwitterIcon />}
                style={{textTransform: 'none'}}
                >
                  Twitter
                </Button>
               

                </div>
            </Grid>
        </Grid>
      </Grid>
      
    </Box>
  );
}
