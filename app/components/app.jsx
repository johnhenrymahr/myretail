import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { default as mapDispatchToProps } from '../state/actions'
import { default as mapStateToProps } from '../state/props'
import ProductImage from './productImage'
import PriceBlock from './priceBlock'
import ProductFeatures from './productFeatures'
import ProductReviews from './productReviews'
import './app.less'

class App extends Component {
  componentWillMount () {
    this.props.actions.ui.loadData()
  }

  renderBody () {
    const { data, actions } = this.props
    console.log('data', data)
    const title = _.get(data, 'skuDetails.title', '')
    return (
      <main className='myRetail-item'>
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
    if (this.props.ui.hydrated) {
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
