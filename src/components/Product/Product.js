import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product.key)
    const { name, img, seller, price, stock, key} = props.product;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-Details'>
                <h3><Link to={'/product/'+key}>{name.substring(105,0)+"..."}</Link></h3>
                <p>by: {seller}</p>
                <h4>${price}</h4>
                <p>Only {stock} left in stock - Order soon</p>
               { props.ShowAddToBtn && <button onClick={() => props.hendleAddProduct(props.product)} className='main-button'>now Order</button>}
            </div>
        </div>
    );
};

export default Product;