import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem';

// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'

// import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';

// import { DateRangePickerComponent, PresetsDirective, PresetDirective } from '@syncfusion/ej2-react-calendars';

// import { DateRangePicker, DateRange } from "materialui-daterange-picker";

import { Autocomplete } from '@material-ui/lab';


// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import {countries, construct_filter_params, get_region_based_payments} from '../chartOptions/subscriptionOptions'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    gridItem: {
        // paddingLeft: "10px"  
    },
    paymentGateway: {
        fontSize: "12px"
    }
}))

export default function SubscriptionForm(props){
    const classes = useStyles()
    let today = new Date().toISOString().slice(0, 10)
    let payments = []

    const [value, setValue] = React.useState({ title: 'All', value: "All",offset:"+00:00", color: '#0080ff',order: 0});
    const [selectedDate, setSelectedDate] = React.useState(today);
    const [state, setState] = useState({country: 'All',payment_gateway: 'All'})

    const handleDateChange = (date) => {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate() 
        if(month <= 9) {
            month = `0${month}`
        }

        if(day <= 9){
            day = `0${day}`
        }

        date = `${year}-${month}-${day}`
        setSelectedDate(date);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setState({
          [name]: value,
        });
    };

    payments = get_region_based_payments(state.country)

    let paymentProps = {
        options: payments,
        getOptionLabel: (option) => option.title,
    };    

    const handleSubmit = (event) => {
        event.preventDefault()
        const request = construct_filter_params(state, value, selectedDate)
        props.submitForm(request)
    }

    return (
    <>
        <form onSubmit={handleSubmit}>
            <Grid container spacing = {2}>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="country">
                            Select Country 
                        </InputLabel>
                        <Select native
                            value={state.country}
                            onChange={handleChange}

                            inputProps = {{
                                name: 'country', id:'country'
                            }}
                            
                        >
                            {countries.map(country => <option key = {country.key} value={country.key}>{country.name}</option>)}
                        </Select> 
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {3} >
                    <FormControl className={classes.formControl}                                >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              id="date"
                              label="Select Date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              name = "date"
                            />
                    </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {3}>
                    <InputLabel htmlFor="payment_gateway" className={classes.paymentGateway}>
                        Select Payment Gateway 
                    </InputLabel>
                    <FormControl className={classes.formControl}  id="payment_gateway">
                        <Autocomplete
                            {...paymentProps}
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            debug
                            renderInput={(params) => <TextField {...params}/>}/>
                    </FormControl>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3} >
                    <FormControl className={classes.formControl} id="button">
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </FormControl>
                </Grid>    
            </Grid>
        </form>
    </>
    );
}