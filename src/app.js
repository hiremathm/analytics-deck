import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'


import TabBar from './components/TabBar'
import Login from './components/Login'
import Logout from './components/Logout'
import User from './components/User'
import Register from './components/Register'
import ReportChart from './charts/ReportChart'
import NavBar from './components/NavBar'
import MyDrawer from './components/MyDrawer'
import ActiveUser from './components/ActiveUser';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';

import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  }
}))

function App(props) {
  const classes = useStyles()
  return (
    <>
      <BrowserRouter>
        {_.isEmpty(props.user) ?
          (
            <NavBar link = "login" drawer={false} footer = {true}/>
          ) 
          :
          (
            <NavBar link="logout" drawer={true} footer = {true}/>
          )
        }
      <div className={classes.container}>
        <MyDrawer/>  
        <Switch>
          <Route path="/" component = {Home} exact={true}/>    
          <Route path="/login" component = {Login} exact={true}/>
          <Route path="/logout" component = {Logout} exact={true}/>
          <Route path="/dashboard" component = {TabBar} exact={true}/>
          <Route path="/account" component = {User} exact={true}/>
          <Route path="/register" component = {Register} exact={true}/>
          <Route path="/reports" component = {ReportChart} exact={true}/>
          <Route path="/activeusers" component = {ActiveUser} exact={true}/>
          <Route path="/about" component = {About} exact={true}/>
          <Route path="/contact" component = {Contact} exact={true}/>    
        </Switch> 
      </div>
            </BrowserRouter>

    </>
  );
}

const mapStateToProps = (state) => {
  return {user: state.user}
}
export default connect(mapStateToProps)(App)