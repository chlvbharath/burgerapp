import React, { Component } from 'react'
import Aux from '../../hoc/Auxl/auxl'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
const INGREDIENT_PRICES = {
    salad: .25,
    meat: .5,
    bacon: .75,
    cheese: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://myburger-72558.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true});
            })
    }
    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const oldTotalPrice = this.state.totalPrice;
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const updatedTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type];
        updatedIngredients[type] = updatedIngredientCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedTotalPrice });
        console.log('adding Ingredient:', type);
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        debugger;
        console.log('removing Ingredient:', type);
        const currentIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = currentIngredientCount - 1;
        const currentTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = currentTotalPrice - INGREDIENT_PRICES[type];

        const updatingIngredients = {
            ...this.state.ingredients
        }

        updatingIngredients[type] = updatedIngredientCount;
        this.setState({ ingredients: updatingIngredients, totalPrice: updatedTotalPrice });
        this.updatePurchaseState(updatingIngredients)
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, curVal) => {
                return sum = sum + curVal;
            }, 0);
        debugger;
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContiueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
    }

    render() {
        console.log('State after added', this.state);
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        let orderSummary =  null;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        addToCart={this.purchaseHandler}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
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

export default WithErrorHandler(BurgerBuilder, axios)