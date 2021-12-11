import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Avacado Sauce', type: 'avacado' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Beef', type: 'beef' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Chicken', type: 'chicken' },
    { label: 'Mayo', type: 'mayo' },
    { label: 'Spicy Mayo', type: 'spicyMayo' },
    { label: 'Tomato Relish', type: 'tomatoRelish' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>Done</button>
    </div>
);

export default buildControls;