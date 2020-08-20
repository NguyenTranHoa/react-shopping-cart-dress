import React from 'react';
import data from "./data.json"
import Products from "./components/Products"
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
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
  
  render() {
    const {products, size, sort} = this.state;
    const {sortProducts, filterProducts} = this;
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
              <Products products={products}/>
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
