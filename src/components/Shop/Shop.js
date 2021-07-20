import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
 
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey)
            // console.log(existingKey, savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        // console.log('clicked', product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let productCount = 1;
        let newCart;
        if(sameProduct){
            productCount = sameProduct.quantity + 1;
            sameProduct.quantity = productCount;
            const others = cart.filter( pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];

        }
        // const count = sameProduct.length;
        // const newCart= [...cart, product];
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;eti first step chilo
        addToDatabaseCart(product.key, productCount);
    }

    return (
        <div className = 'same-container'>
            <div className = "product-container">
                
                    {
                        products.map(pd => <Product 
                                            key = {pd.key}
                                            showAddToCart = {true}
                                            handleAddProduct = {handleAddProduct}
                                            product = {pd}>
                                           </Product>)
                    }
                
            </div>
            <div className = 'cart-container'>
                    <Cart cart={cart}>
                        <Link to="/review">
                             <button className="main-button">Review Order</button>
                        </Link>
                    </Cart>
                
            </div>
       </div>
    );
};

export default Shop;