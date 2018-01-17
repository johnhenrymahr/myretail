import React from 'react'
import { shallow } from 'enzyme'
import PriceBlock from './index'

describe('PriceBlock component spec', () => {
  context('price', () => {
    it('does not display price if no price provded', () => {
      const wrapper = shallow(<PriceBlock />)
      expect(wrapper.find('.myRetail-priceblock__price').length).toEqual(0)
    })
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
  context('promotions', () => {
    it('does not render promotions section if there are not any', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online'
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__promotions').length).toEqual(0)
    })
    it('renders promotions section if there are some', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        promotions: [
          'really good deal',
          'even better deal'
        ]
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__promotions').length).toEqual(1)
      expect(wrapper.find('.myRetail-priceblock__promotions li').length).toEqual(2)
    })
  })
  context('item quantity', () => {
    it('renders quantitiy from props', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__quantity--num').text()).toEqual('3')
    })
    it('calls correct action when decrement is clicked', () => {
      const decQuantity = jest.fn()
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3,
        actions: {
          data: {
            decQuantity
          }
        }
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      wrapper.find('.myRetail-priceblock__quantity--dec').simulate('click', {preventDefault: jest.fn()})
      expect(decQuantity.mock.calls.length).toEqual(1)
    })
    it('calls correct action when increment is clicked', () => {
      const incQuantity = jest.fn()
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3,
        actions: {
          data: {
            incQuantity
          }
        }
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      wrapper.find('.myRetail-priceblock__quantity--inc').simulate('click', {preventDefault: jest.fn()})
      expect(incQuantity.mock.calls.length).toEqual(1)
    })
  })
  context('main button block', () => {
    it('renders find a store when instore prop is true', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3,
        instore: true
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__instore').length).toEqual(1)
    })
    it('does not renders find a store when instore prop is false', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__instore').length).toEqual(0)
    })
    it('renders add to cart when online prop is true', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3,
        online: true
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__online').length).toEqual(1)
    })
    it('does not renders add to cart  when online prop is false', () => {
      const props = {
        price: '$45.98',
        qualifier: 'online',
        quantity: 3
      }
      const wrapper = shallow(<PriceBlock {...props} />)
      expect(wrapper.find('.myRetail-priceblock__online').length).toEqual(0)
    })
  })
})
