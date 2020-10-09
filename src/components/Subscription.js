import React from 'react';
import SubscriptionCountByPayments from './SubscriptionCountByPayments'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: "0px",       
    }
}))

const Subscription = () => {
	const classes = useStyles()

    return(
        <>
        <div className={classes.root}>
            <SubscriptionCountByPayments/>
        </div>
        </>
    )
}

export default Subscription;    