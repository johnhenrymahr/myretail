import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class PriceBlock extends Component {
  constructor (props) {
    super(props)
    this.onDecrement = this.onDecrement.bind(this)
    this.onIncrement = this.onIncrement.bind(this)
  }
  onDecrement (e) {
    e.preventDefault()
    this.props.actions.data.decQuantity()
  }
  onIncrement (e) {
    e.preventDefault()
    this.props.actions.data.incQuantity()
  }
  render () {
    const { price, qualifier, promotions, online, instore, quantity } = this.props
    return (
      <div className='myRetail-priceblock'>
        <div className='myRetail-priceblock__price'>
          <strong>{price}</strong>{Boolean(qualifier) && <span>{qualifier}</span> }
        </div>
        {promotions &&
          <ul className='myRetail-priceblock__promotions'>
            {promotions.map((item, idx) =>
              <li key={idx}><span className='glyphicon glyphicon-tag'></span>{item}</li>
            )}
          </ul>
        }
        <div className='row'>
          <div className='col-sm-6 col-xs-12'>
            <div className='myRetail-priceblock__quantity'>
              <span>quantity</span>
              <span>
                <a href='' onClick={this.onDecrement} >
                  <span className='glyphicon glyphicon-minus-sign'>
                    <span className='sr-only'>Decrement item quantity by 1</span>
                  </span>
                </a>
                <span className='myRetail-priceblock__quantity--num'>{quantity}</span>
                <a href='' onClick={this.onIncrement} >
                  <span className='glyphicon glyphicon-plus-sign'>
                    <span className='sr-only'>Increment quantity by 1</span>
                  </span>
                </a>
              </span>
            </div>
          </div>
          <div className='col-sm-6 col-xs-0'></div>
        </div>
        <div className='myRetail-priceblock__buttons row'>
          <div className='col-xs-6'>
            {instore &&
            <span className='myRetail-priceblock__instore'>
              <a href='#' className='btn btn-block btn-secondary'>Pick up in store</a>
              <span>find in a store</span>
            </span>
            }
          </div>
          <div className='col-xs-6'>
            {online &&
            <span className='myRetail-priceblock__instore'>
              <a className='btn btn-block btn-primary'>Add to Cart</a>
            </span>
            }
          </div>
        </div>
        <div className='myRetail-priceblock__returns row'>
          <div className='col-xs-2'>returns</div>
          <div className='col-xs-10'>This item must be returned within 30 days of the ship date. See return policy for details. Prices, promotions, styles and availability may vary by store and online.</div>
        </div>
        <div className='myRetail-priceblock__secondaryButtons row'>
          <div className='col-xs-4'>
            <a href='' className='btn btn-block btn-default btn-xs'>Add to Registry</a>
          </div>
          <div className='col-xs-4'>
            <a href='' className='btn btn-block btn-default btn-xs'>Add to List</a>
          </div>
          <div className='col-xs-4'>
            <a href='' className='btn btn-block btn-default btn-xs'>Share</a>
          </div>
        </div>
      </div>
    )
  }
}

PriceBlock.propTypes = {
  price: PropTypes.string.isRequired,
  qualifier: PropTypes.string,
  quantity: PropTypes.number,
  promotions: PropTypes.array,
  online: PropTypes.bool,
  instore: PropTypes.bool,
  actions: PropTypes.object
}

export default PriceBlock
