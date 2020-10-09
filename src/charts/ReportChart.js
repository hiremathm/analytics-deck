import React,{useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CSVLink} from 'react-csv';
import Axios from 'axios'

const useStyles = makeStyles(theme =>({
	root: {
    	marginTop: 60,
    	backgroundColor: theme.palette.background.paper,
	}
}))

export default function ReportChart(){
	const classes = useStyles()
	const [plans,setPlans] = useState(5)

	const csvData =[
	  ['firstname', 'lastname', 'email'] ,
	  ['John', 'Doe' , 'john.doe@xyz.com'] ,
	  ['Jane', 'Doe' , 'jane.doe@xyz.com']
	];

	useEffect(() => {
		console.log("data",plans)	
		Axios.get('http://15.206.210.206:9200/user_plans/_count?pretty')
			.then(response => setPlans(response.data.count))
	})

	return <div className={classes.root}>Total plans {plans} - <CSVLink data={csvData}>Download Here</CSVLink></div>}