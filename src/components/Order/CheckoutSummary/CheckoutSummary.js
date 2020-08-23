import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
const checkoutSummary = (props) => {
    return(
        <div className={classes.checkoutSummary}>
            <h1>Hope it tastes good</h1>
            <div style={{width:'100%', height:'auto', margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button
            btnType='Danger'
            clicked={props.checkoutCancelled}>Cancel</Button>
            <Button
            btnType='Success'
            clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}
export default checkoutSummary;