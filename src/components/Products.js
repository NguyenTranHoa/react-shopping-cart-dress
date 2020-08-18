import React, { Component } from 'react'
import formatCurrency from "../util"

export default class Products extends Component {
    render() {
        let { products } = this.props;
        return (
            <div>
                <ul className="products">
                    {products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href="/#">
                                    <img src={product.image} alt="" />
                                    <p className="product-title">
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
