import {createStore, combineReducers} from 'redux'

import userReducer from '../reducers/user'
import exportReducer from '../reducers/export'

const configureStore = () => {
	const store = createStore(combineReducers({
		user: userReducer,
		export: exportReducer
	}))
	return store
}

export default configureStore;