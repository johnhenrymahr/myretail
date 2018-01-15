import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PriceBlock extends Component {

  render () {
    const { price, qualifier, promotions, online, instore, quantity } = this.props
    return (
      <div className='myRetail-priceblock'> 
        <div className='myRetail-priceblock__price'>
          <strong>{price}</strong><span>{qualifier}</span>
        </div>
        <ul className='myRetail-priceblock__promotions'>
          {promotions.map((item, idx) => 
            <li key={idx}><span className='glyphicon glyphicon-tag'></span>{item}</li>
          )}
        </ul>
        <div className='myRetail-priceblock__quantity'>
          <span>Quantity</span>
          <a href=''><span className='glyphicon glyphicon-minus-sign'></span></a>
              {quantity}
          <a href=''><span className='glyphicon glyphicon-plus-sign'></span></a>           
        </div>
      </div>
    )
  }
}

PriceBlock.propTypes = {
  price: PropTypes.string,
  qualifier: PropTypes.string,
  quantity: PropTypes.number,
  promotions: PropTypes.array,
  online: PropTypes.bool,
  instore: PropTypes.bool
}

export default PriceBlock