import React from 'react'
import { shallow } from 'enzyme'
import PriceBlock from './index'

describe('PriceBlock component spec', () => {
  it('displays price and qualifier', () => {
    const props = {
      price: '$45.98',
      qualifier: 'online'
    }
    const wrapper = shallow(<PriceBlock {...props} />)
    expect(wrapper.find('.myRetail-priceblock__price').find('strong').text())
      .toEqual('$45.98')
    expect(wrapper.find('.myRetail-priceblock__price').find('span').text())
      .toEqual('online')
  })
  it('displays price without qualifier', () => {
    const props = {
      price: '$45.98'
    }
    const wrapper = shallow(<PriceBlock {...props} />)
    expect(wrapper.find('.myRetail-priceblock__price').find('span').length)
      .toEqual(0)
  })
})
