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
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://myburger-72558.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
    }
    
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, curVal) => {
                return sum = sum + curVal;
            }, 0);
        debugger;
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContiueHandler = () => {
        
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
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

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
        ings: state.ingredients,
        totalSum : state.totalPrice
    }
}
const mapDispatchToProps = dispath => {
    return {
        onIngredientAdded : (ingName) => dispath({
            type: actionTypes.ADD_INGREDIENTS,
            ingredientName: ingName
        }),
        onIngredientRemoved : (ingName) => dispath({
            type: actionTypes.REMOVE_INGREDIENTS,
            ingredientName: ingName
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)( WithErrorHandler(BurgerBuilder, axios))