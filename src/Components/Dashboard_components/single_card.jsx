import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const usecardStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
});

const caller=()=>{

    

  }


const useStyles = makeStyles((theme) => ({
   
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
},
menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
    display: 'none',
    },
},
    // necessary for content to be below app bar
toolbar: theme.mixins.toolbar,
    drawerPaper: {
    width: drawerWidth,
    },
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    },
}));

const single_card=(props)=>{
const { window } = props;
const classes = useStyles();
const drawerWidth = 240;
const [mobileOpen, setMobileOpen] = React.useState(false);
      
const classescard = usecardStyles();
    return (
        <div>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            <Card className={classescard.root}>
              <CardActionArea>
              <CardMedia
                component="img"
                alt="Property1"
                height="140"
                image="static/images/board.jpg"
                title="Hellloo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Delhi
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  P1
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions> 
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit 
                  </Button>
                </CardActions>
              </Card>   
          </main> 
        </div>
        );
    }
export default single_card;