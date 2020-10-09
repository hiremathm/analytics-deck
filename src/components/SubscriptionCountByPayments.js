import React from 'react';
import Axios from 'axios'

import {get_region_based_zone, construct_region_wise_body,get_region_based_payments} from '../chartOptions/subscriptionOptions'
import SubscriptionForm from './SubscriptionForm'

import Chart from './Chart'

class SubscriptionCountByPayments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            sum: 0,
            countOptions: {chart: {height: 100,width: 100,type: 'column'},title: {text: ''},xAxis: {categories: []},yAxis: {min: 0,title: {text: ""},stackLabels: {enabled: true,style: {fontWeight: 'bold',color: 'gray'}}},legend: {verticalAlign: 'top',floating: false,backgroundColor: 'white',borderColor: '#CCC',shadow: false},tooltip: {headerFormat: '',pointFormat: '{series.name}: {point.y}'},series: [],plotOptions: {column: {stacking: 'normal',dataLabels: {enabled: true}}},credits: {enabled: false}},
            revenueOptions: {},
            pieOptions: { chart: {width: 300,  height: 200,plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie' }, title: { text: '' }, tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' }, accessibility: { point: { valueSuffix: '%' } }, plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' } } }, series: [{ name: 'Revenue', colorByPoint: true, data: [{ name: 'CC Avenue', y: 0.1, sliced: true, selected: true }]}],credits: {enabled: false}}
        }
    }

    componentDidMount = () => {
        this.loadData()
        setInterval(this.loadData, 60000)
    }

    loadData = () =>{

        let event = {}
        event["country"] = "All"
        event["date"] = new Date().toISOString().slice(0, 10)
        let region = event["country"]

        let body = []
        let zone = get_region_based_zone(region)
        let keys = Object.keys(zone)
        let payment_gateway = "All"

        if ((region === "All") && (payment_gateway === "All")){
            body = keys.map(key => {
                return construct_region_wise_body(event, zone[key], key)
            })
            
            this.setTheState(body, region)
        }
    }
    
    submitForm = (event) => {
        let region = event["country"]
        let body = []
        let zone = get_region_based_zone(region)
        let keys = Object.keys(zone)
        let payment_gateway = event["payment_gateway"]
        if((region === 'IN' || region === "US") && (payment_gateway === "All")){
            body = keys.map(key => {
                return construct_region_wise_body(event, zone[key], key)
            })
            this.setTheState(body, region) 
        }else if((region === "IN" || region === "US") && (payment_gateway !== "All")){
            let key = Object.keys(zone).find(key => zone[key].includes(payment_gateway))
            body = construct_region_wise_body(event, [payment_gateway], key)
            console.log("BODY", body)
            this.setTheState([body], region)
        }else if((region === "All") && (payment_gateway !== "All" )){
            keys = keys.filter(key => zone[key].includes(payment_gateway))
            body = keys.map(key => {
                return construct_region_wise_body(event, [payment_gateway], key)
            })
            this.setTheState(body, region)     
        }else if ((region === "All") && (payment_gateway === "All")){
            body = keys.map(key => {
                return construct_region_wise_body(event, zone[key], key)
            })
            this.setTheState(body, region)
        }
    }

    setTheState = (body, region) => {
        let requests = []
        let responses = []
        const data = get_region_based_payments(region)
        let count = 0
        let sum = 0
        
        body.forEach(obj => {
            requests.push(Axios.post('http://15.206.210.206:9200/user_plans/_search?pretty',obj))
        })

        Promise.all(requests).then((values) => {
            values.map(val => responses.push(val["data"]["aggregations"]["group_by_payments"]["buckets"]))
            responses = responses.flat(Infinity)
            const countSeries = responses.map(resp => {
                let obj = {}
                let color =  data.find(gateway => gateway.value === resp.key)
                obj["name"] = color.title
                obj["data"] = [resp.doc_count]
                obj["color"] = color.color
                count += parseInt(resp.doc_count)
                return obj
            })

            const revenueSeries = responses.map(resp => {
                let obj = {}
                let color =  data.find(gateway => gateway.value === resp.key)
                obj["name"] = color.title
                obj["data"] = [resp.sum_prices.value]
                obj["color"] = color.color
                sum += parseInt(resp.sum_prices.value)
                return obj
            })

            const pieSeries = responses.map(resp => {
                let obj = {}
                let color =  data.find(gateway => gateway.value === resp.key)
                obj["name"] = color.title
                obj["y"] = resp.sum_prices.value
                return obj
            })
            let today = new Date().toISOString().slice(0, 10)

            let countOptions = {chart: {height: 400,type: 'column'},title: {text: ''},xAxis: {categories: [today]},yAxis: {min: 0,title: {text: ""},stackLabels: {enabled: true,style: {fontWeight: 'bold',color: 'gray'}}},legend: {verticalAlign: 'top',floating: false,backgroundColor: 'white',borderColor: '#CCC',shadow: false},tooltip: {headerFormat: '',pointFormat: '{series.name}: {point.y}'},series:  countSeries.reverse(),plotOptions: {column: {stacking: 'normal',dataLabels: {enabled: true}}},credits: {enabled: false}}

            let revenueOptions = {chart: {height: 400,type: 'column'},title: {text: ''},xAxis: {categories: [today]},yAxis: {min: 0,title: {text: ""},stackLabels: {enabled: true,style: {fontWeight: 'bold',color: 'gray'}}},legend: {verticalAlign: 'top',floating: false,backgroundColor: 'white',borderColor: '#CCC',shadow: false},tooltip: {headerFormat: '',pointFormat: '{series.name}: {point.y}'},series:  revenueSeries.reverse(),plotOptions: {column: {stacking: 'normal',dataLabels: {enabled: true}}},credits: {enabled: false}}

            let pieOptions = { chart: {width: 400,height: 200,plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie' }, title: { text: '' }, tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' }, accessibility: { point: { valueSuffix: '%' } }, plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %'}}}, series: [{ name: 'Revenue', colorByPoint: true, data: pieSeries}],credits: {enabled: false}}

            this.setState({count: count, sum: sum,pieOptions: pieOptions,countOptions: countOptions,revenueOptions: revenueOptions})
        });
    }

    render(){
        let today = new Date().toISOString().slice(0, 10)
        return(
        <>
            <div>
                <SubscriptionForm submitForm={this.submitForm}/>
            </div>
            <div>
                <Chart pieOptions={this.state.pieOptions} countOptions={this.state.countOptions} revenueOptions={this.state.revenueOptions} count={this.state.count} sum={this.state.sum} date={today}/>
            </div>
        </>
        )
    }
}
export default SubscriptionCountByPayments;