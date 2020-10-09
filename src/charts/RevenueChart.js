import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function RevenueChart(props){
	return(
		<div>
			<HighchartsReact highcharts={Highcharts}  options={props.pieOptions}/>
		</div>
	)
} 