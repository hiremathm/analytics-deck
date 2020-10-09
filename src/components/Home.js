import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 60,
    backgroundColor: theme.palette.background.paper,
  },
}))

const Home = (props) => {
	const classes = useStyles();
	return <div className={classes.root}> THIS IS HOME PAGE</div>
}
export default Home;