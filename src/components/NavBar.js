import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    // root: {
      // color: 'white',
      // display: 'flex',
      // fontWeight: 500
    // },
    // list: {
    //   color: 'white',
    //   fontWeight: 500,
    // },
    // listitem: {
    //   fontWeight: 500,
    // }
    // ,
    appBar: {
      width: `calc(100% - 128px)`,
      backgroundColor: "#000080",
      zIndex: theme.zIndex.drawer + 1,
    },
    // title: {
    //   flexGrow: 1,
    //   fontWeight: 500
    // },
    link: {
      textDecoration: 'none',
      color: 'white',
      fontWeight: 500
    },
    // copyright: {
    //   textDecoration: 'none',
    //   fontSize: "14px",
    // }
}));
  
const NavBar = (props) => {
	const classes = useStyles()
  return<Grid container> 
        <AppBar position="fixed" className={classes.appBar}>
        	<Toolbar>
            <Grid item xs = {8}>
              <Typography variant="h6" noWrap>
                ANALYSIS DECK 
              </Typography>
            </Grid>
            <Grid item xs = {8}/>
            <Grid item xs = {1}>
        		  <Link to = {props.link} className={classes.link}>{props.link.toUpperCase()}</Link>     
            </Grid>
          </Toolbar>
      	</AppBar>
      </Grid>
}

export default NavBar;