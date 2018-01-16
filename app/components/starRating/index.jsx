import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StarRating extends Component {
  getStars () {
    const rating = (this.props.rating || 1)
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
      <div className='MyRetail-rating'>
        {this.getStars().map((starClass, idx) =>
          <span key={idx} className={starClass}>★</span>
        )}
      </div>
    )
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
}

export default StarRating
