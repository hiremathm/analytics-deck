import Axios from 'axios'
var environment = process.env.NODE_ENV || 'development';
console.log("env", environment)
let axios = ''

if(window.location.origin.includes("https")){
	axios = Axios.create({
		baseURL: "https://snotemern.herokuapp.com"
	});	
}else{
	axios = Axios.create({
		baseURL: "http://snotemern.herokuapp.com"
	});
}


export default axios;