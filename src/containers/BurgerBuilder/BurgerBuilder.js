import React, { Component } from 'react'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxl/auxl'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngedients();
    }
    
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, curVal) => {
                return sum = sum + curVal;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContiueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout'            
        });
    }

    render() {
        console.log('State after added', this.state);
        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        let orderSummary =  null;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        add={this.props.onIngredientAdded}
                        remove={this.props.onIngredientRemoved}
                        addToCart={this.purchaseHandler}
                        disabledInfo={disabledInfo}
                        totalPrice={this.props.totalSum}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.totalSum}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContiueHandler} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalSum : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispath => {
    return {
        onIngredientAdded : (ingName) => dispath(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispath(actions.removeIngredient(ingName)),
        onInitIngedients: () => dispath(actions.initIngredients()),
        onInitPurchase: () => dispath(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)( WithErrorHandler(BurgerBuilder, axios))