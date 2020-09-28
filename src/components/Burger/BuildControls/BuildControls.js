import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: {props.totalPrice.toFixed(2)}</p>

        {
            controls.map(control => (
                <BuildControl 
                key={control.label}
                label ={control.label} 
                type={control.type}
                add={() => props.add(control.type)}
                remove={() => props.remove(control.type)}
                totalPrice ={props.totalPrice}
                disabled={props.disabledInfo[control.type]}/>
            ))
        }
        <button 
        className={classes.OrderButton}
        disabled = {!props.purchasable}
        onClick = {props.addToCart}
        >ORDER</button>
    </div>
)
export default buildControls;