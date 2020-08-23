import React, { Component } from 'react'
import Aux from '../../../hoc/Auxl/auxl'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
    //This could be functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('Order summary Will Update');
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return <li key={igkey}><span style={{ textTransform: "capitalize" }}>{igkey}</span>: {this.props.ingredients[igkey]}</li>
            })
        return (
            <Aux>
                <h3> Your Order Details</h3>
                <p> Ingredients list:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <Button clicked={this.props.cancelPurchase} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.continuePurchase} btnType="Success">Continue</Button>
            </Aux>
        );
    };
}


export default OrderSummary;