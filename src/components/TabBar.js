import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'

import Transaction from './Transaction'
import Subscription from './Subscription';
import ActiveUser from './ActiveUser';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 60,
    width: "100%",
    paddingLeft: "15px"
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <div className={classes.root}>
          <Paper elevation={3} square>

            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Subscriptions" {...a11yProps(0)}/>
            
              <Tab label="Transaction" {...a11yProps(1)}/>
           
              <Tab label="ActiveUser" {...a11yProps(2)}/>
            </Tabs>
          </Paper>

            <TabPanel value={value} index={0}>
              <Subscription/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Transaction/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ActiveUser/>
            </TabPanel>
        </div>
    </>
  );
}