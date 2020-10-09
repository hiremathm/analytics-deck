import React from 'react'
import Axios from 'axios'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {TextField,Button,Typography} from '@material-ui/core';
import { Formik } from 'formik';

import { makeStyles } from '@material-ui/core/styles';


import {connect} from 'react-redux'

const useStyles = makeStyles((theme)=>({
    root: {
      flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    sumbit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorText: {
        color: 'red',
        fontSize: "10px"
    }
}))

function Register(props){
    const classes = useStyles()

    return(
        <div className={classes.root}>
        <Formik
                initialValues={{ email: '', mobile: '', name: '', password:''}}
                validate={values => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'E-mail address is invalid';
                    }

                    if (!values.mobile) {
                        errors.mobile = 'Required';
                    }


                    if (!values.password) {
                        errors.password = 'Required';
                    }else if(values.password.length < 5){
                        errors.password = 'Password is too short (minimum is 6 characters)'
                    }


                    return errors;
                }}
               onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values));
                        const formData = values
                        Axios({
                            url: 'https://snotemern.herokuapp.com/users',
                            method: 'POST',
                            data: formData
                        })
                        .then(user => {
                            if(user.data.errors){
                                console.log("user logged errors", user)
                            }else{
                                props.history.push('/login')
                            }
                        })
                        .catch(error => {
                            console.log("logged in error is ", error)
                        })
                        setSubmitting(false);
                    }, 400);
               }}
            >

            {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>

              <Typography component="h1" variant="h5">
                SIGN UP
              </Typography>

              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField 
                    variant = "outlined"
                    margin = "normal"
                    required 
                    fullWidth
                    id="name"
                    label= "Name"
                    name = "name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
                <Typography className={classes.errorText}>{errors.name && touched.name && errors.name}</Typography>


                <TextField 
                    variant = "outlined"
                    margin = "normal"
                    required 
                    fullWidth
                    id="email"
                    label= "Email Address"
                    name = "email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                <Typography className={classes.errorText}>{errors.email && touched.email && errors.email}</Typography>

                <TextField 
                    variant = "outlined"
                    margin = "normal"
                    required 
                    fullWidth
                    id="email"
                    label= "Mobile number"
                    name = "mobile"
                    autoComplete="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                />

                <Typography className={classes.errorText}>{errors.mobile && touched.mobile && errors.mobile}
                </Typography>

                <TextField 
                    variant = "outlined"
                    margin = "normal"
                    required 
                    fullWidth
                    id="email"
                    label= "Password"
                    name = "password"
                    autoComplete="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />

                <Typography className={classes.errorText}>{errors.password && touched.password && errors.password}
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
              </form>
            </div>
            </Container>
            )}
            </Formik>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {user: state.user}
}
export default connect(mapStateToProps)(Register)


/*

import React from 'react'
import Axios from 'axios'
import {TextField,Button, Grid, FormControlLabel,Checkbox,Typography} from '@material-ui/core';

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            mobile: '',
            name: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    submitHandle = (e) => {
        e.preventDefault()

        let url = "http://snotemern.herokuapp.com/users"
        const formData = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password
        }
        
        Axios({
            method: 'post',
            url: url,
            data: formData
        })
        .then(response => {
            if(response.data.errors){
                console.log("errors", response)
            }else{
                this.props.history.push('/login')
            }
        })
        .catch(error => {
            console.log("error", error)
        })

    }

    render(){
        return (
            <div>
                <form onSubmit={this.submitHandle}>
                    <div>
                        <input type="text" name="name" placeholder="Enter your name " onChange={this.handleChange}/>
                    </div >
                    <div>
                        <input type="email" name="email" placeholder="Enter your email " onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="mobile" name="mobile" placeholder="Enter your mobile " onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Enter your password " onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type = "submit" value = "Register"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;
*/