import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    console.log(product)
    return (
        <div>
            <h4>{productKey}detail coming soon</h4>
            {/* h4 ti change kore your product detail likhe dibo */}
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;