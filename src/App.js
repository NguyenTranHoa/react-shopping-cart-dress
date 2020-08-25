import React from 'react';
import data from "./data.json"
import Products from "./components/Products"
import Filter from './components/Filter';
import Cart from "./components/Cart"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    }
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: data.products.slice().sort((a, b) => (
        sort==="lowest"?((a.price>b.price)?1:-1):((sort==="heighest")?(a.price<b.price?1:-1):((a._id>b._id)?1:-1))
      ))
    })
  }

  filterProducts = (event) => {
    if(event.target.value!=="") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value)>=0)
      })
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products
      })
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if(item._id === product._id) {
        item.count ++;
        alreadyInCart = true;
      }
    })

    if(!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }

    this.setState({
      cartItems
    })
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    
    this.setState({cartItems: cartItems.filter((item) => item._id!==product._id)});

    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item._id!==product._id)))
  }

  createOrder = (order) => {
    console.log(order)
  }
  
  render() {
    const { products, size, sort, cartItems } = this.state;
    const { sortProducts, filterProducts, addToCart, removeFromCart, createOrder } = this;
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={products.length}
                size={size}
                sort={sort}
                sortProducts={sortProducts}
                filterProducts={filterProducts}
              />
              <Products 
              products={products}
              addToCart={addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                createOrder={createOrder} 
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
