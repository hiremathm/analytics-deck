const userReducer = (state = {}, action) => {
	switch(action.type){
		case 'SET_USER': {
			return {...action.payload}
		}
		case 'REMOVE_USER': {
			return {}
		}
		// case 'SET_EXPORT_DATA': {
		// 	// console.log("STATE DATA", (state.data == undefined) ? [] : [state.data] )
		// 	let prevData = (state.data == undefined) ? [] : [state.data]
		// 	let data = [prevData, action.payload]
		// 	return {...state, data: data.flat(Infinity)}
		// }
		default: 
			return {...state}
	}
}

export default userReducer; 