import React from 'react';
import {Drawer as MUIDrawer, ListItem, ListItemText,List, Divider} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "125px",
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  list: {
  	paddingTop: theme.spacing(1),
  },
  AccountCircle: {
  	paddingTop: theme.spacing(1),
  	paddingLeft: theme.spacing(5),
  	color: 'white',
    fontSize: 47
  },
  link: {
      textDecoration: 'none',
      fontWeight: 500,
      color: 'white'
  },
  paper: {
    background: "#000080"
  }
}))

const MyDrawer = (props) => {
	const classes = useStyles()
	return(
  		<MUIDrawer variant="permanent" className={classes.drawer} classes={{ paper: classes.paper }}>
  			<AccountCircleOutlinedIcon className={classes.AccountCircle}/>
        <List className={classes.list}>
	       <Divider/>
        
          {[{name: 'DASHBOARD',link: '/dashboard'},{name: 'WORKSPACE',link: '/workspace'},{name: 'REPORTS',link: '/reports'},{name: 'MATOMO',link: '/matomo'}].map((obj, index) => (
            <ListItem button key={obj.name}>
              <Link to={obj.link} className={classes.link}><ListItemText primary={obj.name}/></Link>
            </ListItem>
	        ))}
  		  </List>
        <Divider/>
        <List>        
          {[{name: 'SETTINGS',link: '/settings'},{name: 'ABOUT',link: '/about'},{name: 'CONTACT',link: '/contact'}].map((obj, index) => (
            <ListItem button key={obj.name}>
              <Link to={obj.link} className={classes.link}><ListItemText primary={obj.name}/></Link>
            </ListItem>
          ))}
        </List>

        <Divider/>
        <List>        
          {[{name: 'ACCOUNT',link: '/account'},{name: 'LOGOUT','link': '/logout'},{name: 'TEMP','link': '/temp'}].map((obj, index) => (
            <ListItem button key={obj.name}>
              <Link to={obj.link} className={classes.link}><ListItemText primary={obj.name}/></Link>
            </ListItem>
          ))}
        </List>
  		</MUIDrawer>
	)
}

export default MyDrawer;