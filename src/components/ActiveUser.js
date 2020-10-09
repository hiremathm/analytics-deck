import React from 'react'
import Axios from 'axios'
import Highcharts from 'highcharts'

class ActiveUser extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            options: {
                chart: {
                    type: 'column'
                },
                title: '',
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears']
                },
                yAxis: {
                    min: 0,
                    stackLables: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: ( // theme
                                Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color
                            ) || 'gray'
                        }
                    }
                },
                legend: {
                    verticalAlign: 'top',
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                    borderColor: '#CCC',
                    // borderWidth: 1,
                    shadow: false,
                    // floating: true,

                },
                series: [{
                    name: 'John',color: 'red',
                    data: [5, 3, 4]
                }, {
                    name: 'Jane',color: 'green',
                    data: [2, 2, 3]
                }, {
                    name: 'Joe',
                    data: [3, 4, 4]
                }],
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name} : {point.y}'
                }
            }
        }
    }

    componentDidMount = () => {
        let today = new Date().toISOString().slice(0, 10)

        Axios.post("http://15.206.210.206:9200/user_plans/plans/_count?pretty",{"query":{"bool":{"must":[{"match":{"transaction_env":"production"}}],"must_not":[{"match":{"payment_gateway":"tata_sky"}}],"filter":[{"range":{"valid_till":{"gte":today}}}]}}})
            .then(response => {
                const count = response.data.count
                // const series = [{name: 'Active users',data: [count,32333,40500]},{name: 'Not Active users',data: [40000, 32333, count]},{name: 'Subscribed users',data: [40500, 32833, count],marker: {
                //     enabled: false
                // }}]
                this.setState({count: count})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
               
                Active Users Count : {this.state.count} 
               
            </div>
        )
    }
}

export default ActiveUser;    
