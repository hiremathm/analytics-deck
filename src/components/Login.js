import React,{useState} from 'react'
import Axios from '../config/config'
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {TextField,Button, Grid, FormControlLabel,Checkbox,Typography} from '@material-ui/core';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import { green} from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#115293",
    },
    secondary: {
      main: "#4caf50",
    },
  },
});

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
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	
	
	},
	errorText: {
		color: 'red',
		fontSize: "10px"
	},
	buttonSuccess: {
    	backgroundColor: green[500],
    	'&:hover': {
      	backgroundColor: green[700],
    },
  }
}))

const Login = (props) => {
	const classes = useStyles()
	let [state, setLoading] = useState(false)
	let [buttonText, setButtonText] = useState('Login')
	let [buttonColor, setButtonColor] = useState('primary')
	let [loginIcon,setLoginIcon] = useState(false)
	return(
		<div className={classes.root}>
		<Formik
		       	initialValues={{ email: '', password: '' }}
		       	validate={values => {
		        	const errors = {};
		        	if (!values.email) {
		           		errors.email = 'Required';
		        	} else if (
		           		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		        	) {
		           		errors.email = 'E-mail address is invalid';
		        	}

		        	if (!values.password) {
		           		errors.password = 'Required';
		        	}else if(values.password.length < 5){
		        		errors.password = 'PPassword is too short (minimum is 6 characters)'
		        	}

		        	return errors;
		       	}}
		       onSubmit={(values, { setSubmitting }) => {
		        	console.log("STATE",state)
		        	setTimeout(() => {
		           		// alert(JSON.stringify(values));
		           		const formData = values
		           		Axios({
				            url: '/users/login',
				            method: 'POST',
				            data: formData
				        })
				        .then(user => {
				            if(user.data.errors){
				                console.log("Login Errors", user)
				            }else{
			            		setLoading(false)
			            		setLoginIcon(true)
				           		setButtonText('Success')
				           		setButtonColor("secondary")
				            	setTimeout(() => {
				            		localStorage.setItem('userAuthToken',user.data.token)
				            		props.history.push('/account')
				            	}, 3000)

				   			}
				        })
				        .catch(error => {
				            console.log("logged in error is ", error)
				        })
		           		setSubmitting(false);
		         	}, 2000);
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
       	<ThemeProvider theme={theme}>
		<Container component="main" maxWidth="xs">
		    <div className={classes.paper}>
		    	<Fab
           		aria-label="save"
      			color="primary"
      			className={loginIcon ?  classes.buttonSuccess : {}}
    			>
      			{loginIcon ?  <CheckIcon/> : <SaveIcon /> }
    		  </Fab>

		      <Typography component="h1" variant="h5">
          		Sign in
        	  </Typography>
        	  {(!errors.password && !errors.email && state) && <CircularProgress size={43}/>}

		      <form className={classes.form} noValidate onSubmit={handleSubmit}>
		      	<TextField 
		      		variant = "outlined"
		      		margin = "normal"
		      		required 
		      		fullWidth
		      		id="email"
		      		label= "Email Address"
		      		name = "email"
		      		autoComplete="email"
		      		autoFocus
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
		      		id="password"
		      		label= "Password"
		      		name = "password"
		      		type="password"
		      		autoComplete="current-password"
		      		onChange={handleChange}
             		onBlur={handleBlur}
             		value={values.password}
		      	/>
		      	<Typography className={classes.errorText}>{errors.password && touched.password && errors.password}
		      	</Typography>
		      	<FormControlLabel
		            control={<Checkbox value="remember" color="primary" />}
		            label="Remember me"
		        />

        	  	<Button
		            type="submit"
		            fullWidth
		            variant="contained"
		            onClick={()=> {setLoading(true)}}
					color={buttonColor}
			        >
		      		{buttonText}
		      	</Button>
     			
		      	<Grid container className={classes.form}>
		            <Grid item xs>
		              <Link to="#" variant="body2">
		                Forgot password?
		              </Link>
		            </Grid>
		            <Grid item>
		              <Link to="/register">
		                {"Don't have an account? Sign Up"}
		              </Link>
		            </Grid>
		        </Grid>
		      </form>
		    </div>
		    </Container>
		    </ThemeProvider>
		    )}
		    </Formik>
		</div>
	)
}
const mapStateToProps = (state) => {
	return {user: state.user}
}
export default connect(mapStateToProps)(Login)