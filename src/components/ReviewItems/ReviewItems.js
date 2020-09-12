import React from 'react';

const ReviewItems = (props) => {
    // console.log(props.product)
    const {name, quantity, img, key, price} = props.product;
    const style = {
        marginBottom:'5px',
        borderBottom:'2px solid gray',
        padding:'5px'
    };
    return (
        <div style={style}>
            <h4>{name}</h4>
            <img src={img} alt=""/>
            <h3>quantity: {quantity}</h3>
            <p>price: ${price}</p>
            <button onClick={()=>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItems;