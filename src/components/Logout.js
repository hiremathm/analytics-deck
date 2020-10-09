import React from 'react'
import {connect} from 'react-redux'
import {removeUser} from '../actions/user'

class Logout extends React.Component {

	componentDidMount = () => {
		localStorage.removeItem('userAuthToken')
        this.props.dispatch(removeUser(this.props.user))
		this.props.history.push('/login')
	}

	render(){
		return(
			<div>Logout component</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {user: state.user}
}

export default connect(mapStateToProps)(Logout);