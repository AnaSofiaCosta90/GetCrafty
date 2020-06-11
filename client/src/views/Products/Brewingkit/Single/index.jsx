import React, { Component } from 'react';
import './style.scss';

import { singleBrewingkit } from '../../../../services/brewingkit';
import ProductButtons from './../../../../components/ProductButtons';
import calcQuantity from './../../../../helpers/update-quantity';

class BrewingkitSingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brewingkit: null
    };
  }

  loadBrewingkit() {
    //console.log(this.props)
    singleBrewingkit(this.props.match.params.id)
      .then(brewingkit => {
        this.setState({
          brewingkit
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    //console.log('mounted');
    this.loadBrewingkit();
  }

  render() {
    let product = this.state.brewingkit;
    let shoppingBasket = this.props.shoppingBasket;

    return (
      <div>
        {this.state.brewingkit && (
          <div className="product__page">
            <div className="product__info">
              <h1>{product.name}</h1>
              <img src={product.photo} alt={product.name} className="z" />
              <div className="product__buttons-single">
                <ProductButtons
                  {...this.props}
                  product={product}
                  quantity={calcQuantity(shoppingBasket, product)}
                  shoppingBasket={this.props.shoppingBasket}
                  changeQuantity={quantity => this.props.changeProductQuantity(product, quantity)}
                />
              </div>
              <p>{product.description}</p>
            </div>
            <hr />
            <h2>YOU'LL NEED THIS IF YOU'RE MAKING...</h2>
            <ul>
              <li>LIST BEERS</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default BrewingkitSingleView;
