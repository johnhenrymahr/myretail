import React from 'react'
import { shallow } from 'enzyme'
import ProductFeatures from './index'

describe('product features component spec', () => {
  it('does not render if no features are provided', () => {
    const wrapper = shallow(<ProductFeatures />)
    expect(wrapper.type()).toEqual(null)
  })
  it('renders li for each feature', () => {
    const props = {
      features: [
        {
          k: 'one',
          v: 'two three'
        },
        {
          k: 'foo',
          v: 'foobar'
        }
      ]
    }
    const wrapper = shallow(<ProductFeatures {...props} />)
    expect(wrapper.find('li').length).toEqual(2)
    expect(wrapper.find('li').at(1).find('span').at(0).text()).toEqual('foo')
    expect(wrapper.find('li').at(1).find('span').at(1).text()).toEqual('foobar')
  })
})
