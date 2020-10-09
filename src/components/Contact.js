import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 60,
    backgroundColor: theme.palette.background.paper,
  },
}))

const Contact = (props) => {
	const classes = useStyles();
	return <div className={classes.root}>THIS IS CONTACT PAGE</div>
}

export default Contact;