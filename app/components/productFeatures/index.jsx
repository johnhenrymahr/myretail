import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class ProductFeatures extends Component {
  render () {
    const features = this.props.features || []
    if (features.length) {
      return (
        <div className='myRetail-productHightlights'>
          <h2>product highlights</h2>
          <ul>
            {features.map((item, idx) =>
              <li key={idx}><span>{item.k}</span><span>{item.v}</span></li>
            )}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

ProductFeatures.propTypes = {
  features: PropTypes.array
}

export default ProductFeatures
