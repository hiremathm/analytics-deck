import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Axios from '../src/config/config'

import App from './app';

import configureStore from './store/configureStore'
import {setUser} from './actions/user'
// import {setExportData} from './actions/export'

const store = configureStore()

if(localStorage.getItem('userAuthToken')){
    let url = "/users/account"
    Axios({
        method: 'post',
        url: url,
        data: {},
        headers: {"x-auth": localStorage.getItem('userAuthToken')}
    })
    .then(response => {
        if(!response.data.errors){
            store.dispatch(setUser(response.data))
            // const name = {type: "count", series: []}
            // store.dispatch(setExportData(name))
        }
    })
}


store.subscribe(() => {
    let state = store.getState()
	console.log("STATE:", state)
})


const jsx = (
	<Provider store = {store}>
		<App/>
	</Provider>

)
ReactDOM.render(jsx,document.getElementById('root'));