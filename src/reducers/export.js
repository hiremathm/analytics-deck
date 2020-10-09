const exportReducer = (state = {}, action) => {
	switch(action.type){
		case 'SET_EXPORT_DATA': {
			let prevExport = state
			let data = [prevExport, action.payload]
			data = data.flat(Infinity)
			console.log("data",data)
			return data 
		}
		default: 
			return {...state}
	}
}
export default exportReducer;