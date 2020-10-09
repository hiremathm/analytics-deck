import React from 'react';
import Axios from 'axios'

class TransactionByPayments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
    }

    componentDidMount = () => {
        Axios.get("http://15.206.210.206:9200/user_plans/_count?pretty")
            .then(response => {
                const count = response.data.count
                this.setState({count})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                Subscription Count : {this.state.count}
            </div>
        )
    }
}

export default TransactionByPayments;    