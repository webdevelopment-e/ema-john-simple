import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name, quantity, img, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid red',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle}>
            {/* <img src={img} alt="" /> */}
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small> $ {price}</small></p>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;