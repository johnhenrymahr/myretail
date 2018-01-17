import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class StarRating extends Component {
  getStars () {
    const rating = parseInt(this.props.rating, 10)
    const stars = []
    let i = 1
    while (i < 6) {
      stars.push('star' + (i <= rating ? ' star--selected' : ''))
      i++
    }
    return stars
  }
  render () {
    return (
      <span className='MyRetail-rating'>
        {this.getStars().map((starClass, idx) =>
          <span key={idx} className={starClass}>★</span>
        )}
      </span>
    )
  }
}

StarRating.propTypes = {
  rating: PropTypes.string.isRequired
}

export default StarRating
