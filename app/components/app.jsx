import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { default as mapDispatchToProps } from '../state/actions'
import { default as mapStateToProps } from '../state/props'
import ProductImage from './productImage'
import PriceBlock from './priceBlock'
import ProductFeatures from './productFeatures'
import ProductReviews from './productReviews'
import _ from 'lodash'
import './app.less'

class App extends Component {
  componentWillMount () {
    const loadData = _.get(this.props, 'actions.ui.loadData')
    if (_.isFunction(loadData)) {
      loadData()
    }
  }

  renderPageError () {
    return (
      <main className='myRetail-item'>
        <div className='myRetail-item__pageError'>
          <span className='glyphicon glyphicon-warning-sign' />
          <span>We’re sorry. This page is not currently available.</span>
        </div>
      </main>
    )
  }

  renderBody () {
    const { actions } = this.props
    const data = this.props.data || {}
    const title = _.get(data, 'skuDetails.title', '')
    return (
      <main className='myRetail-item myRetail-item__mainBody'>
        <div className='row'>
          <div className='col-xs-12 col-sm-6'>
            <h1>{title}</h1>
            <ProductImage
              images={data.images}
            />
          </div>
          <div className='col-xs-12 col-sm-6'>
            <PriceBlock
              {...data.pricing}
              {...data.availabilty}
              {...data.skuDetails}
              actions={actions}
              promotions={data.promotions}
            />
            <ProductFeatures
              features={data.features || []}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 col-xs-12'>
            <ProductReviews
              {...data.reviews}
            />
          </div>
          <div className='col-sm-6 col-xs-0'></div>
        </div>
      </main>
    )
  }

  render () {
    if (this.props.ui.pageError) {
      return this.renderPageError()
    } else if (this.props.ui.hydrated) {
      return this.renderBody()
    } else {
      return null
    }
  }
}

App.propTypes = {
  ui: PropTypes.object,
  data: PropTypes.object,
  actions: PropTypes.object
}

export const undecorated = App

export default connect(mapStateToProps, mapDispatchToProps)(App)
