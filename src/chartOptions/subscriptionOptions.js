let today = new Date().toISOString().slice(0, 10)

const countOptions = {chart: {type: 'column'},title: {text: ''},xAxis: {categories: [today]},yAxis: {min: 0,title: {text: ""},stackLabels: {enabled: true,style: {fontWeight: 'bold',color: 'gray'}}},legend: {verticalAlign: 'top',floating: false,backgroundColor: 'white',borderColor: '#CCC',shadow: false},tooltip: {headerFormat: '',pointFormat: '{series.name}: {point.y}'},series: [],plotOptions: {column: {stacking: 'normal',dataLabels: {enabled: true}}},credits: {enabled: false}}

const revenueOptions = {chart: {type: 'column'},title: {text: ''},xAxis: {categories: [today]},yAxis: {min: 0,title: {text: ""},stackLabels: {enabled: true,style: {fontWeight: 'bold',color: 'gray'}}},legend: {verticalAlign: 'top',floating: false,backgroundColor: 'white',borderColor: '#CCC',shadow: false},tooltip: {headerFormat: '',pointFormat: '{series.name}: {point.y}'},series: [],plotOptions: {column: {stacking: 'normal',dataLabels: {enabled: true}}},credits: {enabled: false}}


const piechartOptions = { chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie' }, title: { text: 'Browser market shares in January, 2018' }, tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' }, accessibility: { point: { valueSuffix: '%' } }, plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' } } }, series: [{ name: 'Brands', colorByPoint: true, data: [{ name: 'Chrome', y: 61.41, sliced: true, selected: true }] }] }

const countries = [{key: "All", name: "All"},{key: "IN", name: "India"},{key: "US", name: "United States"}]
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const construct_filter_params = (state, value, selectedDate) => {
  let request = state
  request["date"] = selectedDate
  if(value === null || value === "undefined"){
    request["payment_gateway"] = "All"
  }else{
    request["payment_gateway"] = value.value
    request["offset"] = value.offset
  }
  return request
}

const get_region_based_zone = (region) => {
    let zone = {}
    if(region === "IN"){
      zone = {"+05:30": ["ccavenue", "paytm_qr_code", "paytm"],"+00:00": ["amazon_pay_web","lazy_pay","amazon_pay_tv", "google", "google_play_tv","apple_store"]}
    }
    else if(region === "US"){
      zone = {"+02:00": ["adyen"],"+00:00": ["amazon_pay_tv", "google","roku_pay","google_play_tv","apple_store"]}
    }
    else if(region === "All"){
      zone = {"+00:00": ["amazon_pay_tv", "google", "google_play_tv","apple_store","roku_pay","lazy_pay","amazon_pay_web"],"+02:00": ["adyen"], "+05:30": ["ccavenue", "paytm_qr_code", "paytm"]}
    }
    return zone
}

const construct_region_wise_body = (event, payments, offset) => {
  let must = [{"match":{"transaction_env":"production"}}] 
  if(event["country"] !== "All"){
    must.push({"match":{"region":event["country"]}})
  }
  let filter = [{"range":{"created_at":{"time_zone":`${offset}`,"gte":event["date"],"lte":event["date"]}}}]
  let txnStatus = ['success','autorenewal_success','autorenew']
  let should = {"bool":{"should":[{"terms":{"payment_gateway": payments}}]}}
  let should1 = {"bool":{"should":[{"terms":{"txn_status": txnStatus}}]}}
  
  must.push(should,should1)

  let body = {"query":{"bool":{"must":must,"must_not":[{"match":{"payment_gateway":"tata_sky"}}],"filter":filter}},"aggs":{"group_by_payments":{"terms":{"field":"payment_gateway.keyword"},"aggs":{"sum_prices": {"sum": {"field" :"price_charged"}}}}},"size":0}
  console.log("body is ", body)
  return body
}

const construct_query_body = (event) => {
  let today = event["date"]  
  let region = event["country"]
  let payment_gateway = event["payment_gateway"]
  let offset = event["offset"]
  let must = [{"match":{"transaction_env":"production"}}]
  let filter = []

  if(payment_gateway === "All"){
    filter.push({"range":{"created_at":{"gte":`${today}`,"lte":`${today}`}}})
  }else{
    must.push({"match":{"payment_gateway":payment_gateway}})
    filter.push({"range":{"created_at":{"time_zone":`${offset}`,"gte":`${today}`,"lte":`${today}`}}})
  }

  if(region === "All" || region === ""){

  }else{
    must.push({"match":{"region":region}})            
  }

  let body = {"query":{"bool":{"must":must,"must_not":[{"match":{"payment_gateway":"tata_sky"}}],"filter":filter}},"aggs":{"group_by_payments":{"terms":{"field":"payment_gateway.keyword"},"aggs":{"sum_prices": {"sum": {"field" :"price_charged"}}}}},"size":0}
  return body
}

// const construct_chart_optoins = (response) => {
//   let count = 0
//   let sum = 0

//   const countSeries = response.map(resp => {
//       let obj = {}
//       obj["name"] = resp.key
//       obj["data"] = [resp.doc_count]
//       count += parseInt(resp.doc_count)
//       return obj
//   })
//   const revenueSeries = response.map(resp => {
//       let obj = {}
//       obj["name"] = resp.key
//       obj["data"] = [resp.sum_prices.value]
//       sum += parseInt(resp.sum_prices.value)
//       return obj
//   })

//   let today = new Date().toISOString().slice(0, 10)
//   let data = {count: count,sum: sum, countOptions:{series: countSeries, xAxis: {categories: [today]}},revenueOptions:{series: revenueSeries,xAxis: {categories: [today]}}}
//   return data
// }


const get_region_based_payments = (region) => {
  let payments = {}
  if(region === "All"){
    payments = [
      { title: 'All', value: "All",offset:"+00:00", color: '#0080ff',order: 0},
      { title: 'Paytm', value: "paytm",offset:"+05:30",color: '#FF4500',order:1},
      { title: 'CC Avenue', value: "ccavenue",offset:"+05:30", color: '#228B22',order: 3},
      { title: 'Google Web', value: "google",offset:"+00:00", color: '#00BFFF', order: 4},
      { title: 'Google TV', value: "google_play_tv",offset:"+00:00", color: '#1E90FF',order: 6},
      { title: 'Amazon Pay TV', value: "amazon_pay_tv",offset:"+00:00",color: '#FF1493',order: 7},
      { title: 'Amazon Pay Web', value: "amazon_pay_web",offset:"+00:00", color: '#0000CD',order: 9},
      { title: 'Paytm QR Code', value: "paytm_qr_code",offset:"+05:30", color: '#F4A460',order: 2},
      { title: 'Adyen', value: "adyen",offset:"+02:00", color: '#D2691E',order: 11},
      { title: 'Apple Store', value: "apple_store",offset:"+00:00",color:'#A52A2A',order: 5},
      { title: 'Lazypay', value: "lazy_pay",offset:"+00:00", color: '#778899',order: 8},
      { title: 'Rokupay', value: "roku_pay",offset:"+00:00", color: '#000000',order: 10}
    ]
  }else if(region === "IN"){
    payments = [
      { title: 'All', value: "All",offset:"+00:00", color: '#0080ff',order: 0},
      { title: 'Paytm', value: "paytm",offset:"+05:30",color: '#FF4500',order:1},
      { title: 'CC Avenue', value: "ccavenue",offset:"+05:30", color: '#228B22',order: 3},
      { title: 'Google Web', value: "google",offset:"+00:00", color: '#00BFFF', order: 4},
      { title: 'Google TV', value: "google_play_tv",offset:"+00:00", color: '#1E90FF',order: 6},
      { title: 'Amazon Pay TV', value: "amazon_pay_tv",offset:"+00:00",color: '#FF1493',order: 7},
      { title: 'Amazon Pay Web', value: "amazon_pay_web",offset:"+00:00", color: '#0000CD',order: 9},
      { title: 'Paytm QR Code', value: "paytm_qr_code",offset:"+05:30", color: '#F4A460',order: 2},
      { title: 'Apple Store', value: "apple_store",offset:"+00:00",color:'#A52A2A',order: 5},
      { title: 'Lazypay', value: "lazy_pay",offset:"+00:00", color: '#778899',order: 8},
    ]
  }else if(region === "US"){
    payments = [
      { title: 'All', value: "All",offset:"+00:00", color: '#0080ff',order: 0},
      { title: 'Google Web', value: "google",offset:"+00:00", color: '#00BFFF', order: 2},
      { title: 'Google TV', value: "google_play_tv",offset:"+00:00", color: '#1E90FF',order: 4},
      { title: 'Amazon Pay TV', value: "amazon_pay_tv",offset:"+00:00",color: '#FF1493',order: 5},
      { title: 'Adyen', value: "adyen",offset:"+02:00", color: '#D2691E',order: 1},
      { title: 'Apple Store', value: "apple_store",offset:"+00:00",color:'#A52A2A',order: 3},
      { title: 'Rokupay', value: "roku_pay",offset:"+00:00", color: '#000000',order: 6}
    ]   

  }
  return payments
}

const paymentGateways = [
  { title: 'All', value: "All",offset:"+00:00", color: '#0080ff',order: 0},
  { title: 'Paytm', value: "paytm",offset:"+05:30",color: '#FF4500',order:1},
  { title: 'CC Avenue', value: "ccavenue",offset:"+05:30", color: '#228B22',order: 3},
  { title: 'Google Web', value: "google",offset:"+00:00", color: '#00BFFF', order: 4},
  { title: 'Google TV', value: "google_play_tv",offset:"+00:00", color: '#1E90FF',order: 6},
  { title: 'Amazon Pay TV', value: "amazon_pay_tv",offset:"+00:00",color: '#FF1493',order: 7},
  { title: 'Amazon Pay Web', value: "amazon_pay_web",offset:"+00:00", color: '#0000CD',order: 9},
  { title: 'Paytm QR Code', value: "paytm_qr_code",offset:"+05:30", color: '#F4A460',order: 2},
  { title: 'Adyen', value: "adyen",offset:"+02:00", color: '#D2691E',order: 11},
  { title: 'Apple Store', value: "apple_store",offset:"+00:00",color:'#A52A2A',order: 5},
  { title: 'Lazypay', value: "lazypay",offset:"+00:00", color: '#778899',order: 8},
  { title: 'Rokupay', value: "roku_pay",offset:"+00:00", color: '#000000',order: 10},
];


module.exports = {countOptions, revenueOptions,countries, names,paymentGateways, construct_filter_params, construct_query_body, get_region_based_zone, construct_region_wise_body, piechartOptions,get_region_based_payments}