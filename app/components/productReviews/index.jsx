import React, { Component } from 'react'
import StarRating from '../starRating'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './index.less'

class ProductReviews extends Component {
  render () {
    const { overallRating, pro, con } = this.props
    const totalReviews = parseInt(this.props.totalReviews, 10)
    return (
      <div className='myRetail-reviews'>
        <div className='myRetail-reviews__overall'>
          <div>
            <StarRating rating={overallRating} /> <span>overall</span>
          </div>
          <div>
            {Boolean(totalReviews && totalReviews > 0) &&
              <a href=''>view all {totalReviews} Reviews</a>
            }
          </div>
        </div>
        <div className='myRetail-reviews__container myRetail-reviews__container--top row'>
          <div className='col-xs-6'>
            <div className='myRetail-reviews__header'>Pro</div>
            <div className='myRetail-reviews__subhead'>most helpfull 4-5 star reveiws</div>
          </div>
          <div className='col-xs-6'>
            <div className='myRetail-reviews__header'>Con</div>
            <div className='myRetail-reviews__subhead'>most helpfull 1-2 star reveiws</div>
          </div>
        </div>
        <hr />
        <div className='myRetail-reviews__container row'>
          <div className='col-xs-6'>

            <div className='myRetail-reviews__rating'>
              <StarRating rating={pro.rating} />
            </div>
            <div className='myRetail-reviews__title'>
              {pro.title}
            </div>
            <div className='myRetail-reviews__body'>
              {pro.review}
            </div>
            <div className='myRetail-reviews__footer'>
              <span><a href=''>{pro.screenName}</a></span><span>{new Moment(pro.date).format('MMMM D, YYYY')}</span>
            </div>
          </div>
          <div className='col-xs-6'>

            <div className='myRetail-reviews__rating'>
              <StarRating rating={con.rating} />
            </div>
            <div className='myRetail-reviews__title'>
              {con.title}
            </div>
            <div className='myRetail-reviews__body'>
              {con.review}
            </div>
            <div className='myRetail-reviews__footer'>
              <span><a href=''>{con.screenName}</a></span><span>{new Moment(con.date).format('MMMM D, YYYY')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductReviews.propTypes = {
  overallRating: PropTypes.string,
  totalReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pro: PropTypes.object,
  con: PropTypes.object
}
export default ProductReviews
