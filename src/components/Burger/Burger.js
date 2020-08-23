import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './Ingredients/Ingredients'
const burger = (props) => {
    console.log('entered burger.js');
    console.log(props.ingredients)
    let processedIngredients = Object.keys(props.ingredients)
        .map(igType => {
            return [...Array(props.ingredients[igType])]
                .map((_, i) => {
                    return <Ingredient key={igType + i} type={igType} />
                })
        })
        .reduce((prev, cur) => {
            return prev.concat(cur)
        }, []);
        if(processedIngredients.length === 0){
            processedIngredients = <p>Please add ingredients</p>
        }
    console.log(processedIngredients);
    return (
        <div className={classes.Burger}>
            <Ingredient type="breadtop" />
            {processedIngredients}

            {/* <Ingredient type="cheese"/>
            <Ingredient type="meat"/>
            <Ingredient type="bacon"/>
            <Ingredient type="salad"/> */}
            <Ingredient type="breadbottom" />

        </div>
    );
}

export default burger;