import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        const { cartItems, removeFromCart } = this.props;
        return (
            <div>
                <div>
                    {cartItems.length === 0
                        ? (<div className="cart cart-header">Cart is empty</div>)
                        : (<div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>)
                    }
                </div>

                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(product => (
                            <li key={cartItems._id}>
                                <div>
                                    <img src={product.image} alt=""></img>
                                </div>
                                <div>
                                    <div>{product.title}</div>
                                    <div className="right">
                                        {formatCurrency(product.price)} x {product.count}{" "}
                                        <button className="button" onClick={() => removeFromCart(product)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {cartItems.length!==0 && (<div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "} 
                            {formatCurrency(cartItems.reduce((a, b) => b.price * b.count + a, 0))}
                        </div>
                        <button className="button primary">Proceed</button>
                    </div>
                </div>)}
                
            </div>
        )
    }
}
