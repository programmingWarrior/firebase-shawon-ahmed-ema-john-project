import React from 'react';
import { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {

    
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () => {
       history.push('shipment');
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity =savedCart[key];
            return product;
        });
        setCart(cartProducts)
    },[])
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt='img'></img>
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItems removeProduct={removeProduct} product={pd} key={pd.key}></ReviewItems>)
                }
                {thankyou}
        </div>
        <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
        </div>
        </div>
    );
};

export default Review;