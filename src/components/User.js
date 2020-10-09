import React from 'react'
import Axios from '../config/config'

import {connect} from 'react-redux'
import {setUser} from '../actions/user'

class User extends React.Component {
    componentDidMount = () => {
        const token = localStorage.getItem('userAuthToken')
        const url = "/users/account"
        if(token){
            Axios({
                method: 'post',
                url: url,
                data: {},
                headers: {"x-auth": localStorage.getItem('userAuthToken')}
            })
            .then(response => {
                const data = response.data
                this.props.dispatch(setUser(data))
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                console.log("error", error)
            })
        }
    }

    render(){
        console.log("window.location.origin", window.location.origin)
        return(
            <div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(User);