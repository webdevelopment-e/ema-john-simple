import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
// import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    // let thankYou;
    // if(orderPlaced){
    //     thankYou = <img src={happyImage} alt="" />
    // }



    const removeProduct = productKey => {
        // console.log('removed clicked', productKey)
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)

    }

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProducts =  productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);

    },[] )
    return (
        <div className="same-container">
            {/* <h1>Cart Items: {cart.length}</h1> */}
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                                product={pd}
                                key={pd.key}
                                removeProduct={removeProduct}>   
                                </ReviewItem>)
            }
            {/* {
                thankYou
            } */}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;