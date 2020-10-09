import React from 'react'
import {Paper, Grid} from '@material-ui/core'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import RevenueChart from '../charts/RevenueChart'
import {CSVLink} from 'react-csv';
import {connect} from 'react-redux'
// import {setExportData} from '../actions/export'

function Chart(props){
	// const setElkData = (options,type) => {
	// 	let name = getReportName(type)
	// 	let data = {type: name, series: options[type+"Options"]["series"]}
 //        props.dispatch(setExportData(data))
	// }

	const getReportName = (type) => {
		let reportTitle = type === "count" ? [`subscriptions_report_for_${props.date}`] : [`revenue_report_for_${props.date}`]
		return reportTitle
	}

	const formatCsvData = (type) => {
		let options = props[type+"Options"]
		let series = options.series
		let names = series.map(obj => {return obj["name"]})
		let values = series.map(obj => {return obj["data"][0]})

		let reportTitle = type === "count" ? [`Total Subscriptions ${props.count} for date ${props.date}`] : [`Total Revenue ${props.sum} for date ${props.date}`]

		let csvData = [reportTitle, names, values]

		return csvData
	}

	return(
	<>
		<Grid container spacing = {1}>
			<Grid item xs={12} sm = {6}>
				<Paper elevation={3}>
					{
                        (props.count === 0) ? 
                        (
                            <p className='subscriptioncount'>No Data Found</p>
                        ) 
                        : 
                        (
                            <>
                                <p className='subscriptioncount'>
                                	Total Subscriptions {props.count} 
                                	{
                                		/*<Button variant = "outlined" color = "primary" style={{marginLeft: "50%"}} onClick = {() => setElkData(props,"count")}>EXPORT</Button>*/
                                	}
                                </p>


                                <HighchartsReact highcharts={Highcharts}  options={props.countOptions}/>

                                <p style={{textAlign: "center"}}>
                                	Download as <CSVLink filename={getReportName("count")+".csv"} data={formatCsvData("count")}>CSV</CSVLink>
                                </p>
                            </>
                        )
                    }
				</Paper>
			</Grid>
			<Grid item xs={12} sm = {6}>
				<Paper elevation={3}>
					{
                        (props.sum === 0) ? 
                        (
                            <p className='subscriptioncount'>No Data Found</p>
                        ) 
                        : 
                        (
                            <>
                                <p className='subscriptioncount'>
                                	Total INR Revenue {props.sum}
                                	{/*
                                		<Button variant = "outlined" color = "primary" style={{marginLeft: "45%"}} onClick = {() => setElkData(props,"revenue")}>EXPORT</Button>
                                	*/}
                                </p>
                                <HighchartsReact highcharts={Highcharts}  options={props.revenueOptions}/>
                            	 <p style={{textAlign: "center"}}>
                                	Download as <CSVLink   filename={getReportName("revenue")+".csv"} data={formatCsvData("revenue")}>CSV</CSVLink>
                                </p>
                            </>
                        )
                    }
				</Paper>
			</Grid>
		</Grid>
		<Grid container spacing = {1}>
		{
            (props.sum === 0) ? 
            (
            	<p></p>
			)
			: 
			(
				<>
				<Grid item xs={12} sm={6} md = {4}>
					<Paper elevation={3}>
						<p className='subscriptioncount'>Total INR Revenue in %</p>
						<RevenueChart pieOptions = {props.pieOptions}/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md = {4}>
					<Paper elevation={3}>
						<p className='subscriptioncount'>Total USD Revenue in %</p>
						<RevenueChart pieOptions = {props.pieOptions}/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md = {4}>
					<Paper elevation={3}>
						<p className='subscriptioncount'>Total Revenue By Region in %</p>
						<RevenueChart pieOptions = {props.pieOptions}/>
					</Paper>
				</Grid>
				</>
			)
		}
		</Grid>
	</>
	)
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Chart);