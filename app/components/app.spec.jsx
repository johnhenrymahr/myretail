import React from 'react'
import { shallow } from 'enzyme'
import { undecorated as App } from './app'

describe('app component spec', () => {
  it('does not render if the if hydration has not either passed or failed', () => {
    const props = {
      ui: {
        hydrated: false,
        pageError: false
      }
    }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.type()).toEqual(null)
  })
  it('renders page error if there has been a page error', () => {
    const props = {
      ui: {
        hydrated: true,
        pageError: true
      }
    }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('.myRetail-item__pageError').length).toEqual(1)
  })
  it('renders main body if page has been hydrated', () => {
    const props = {
      ui: {
        hydrated: true,
        pageError: false
      }
    }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('.myRetail-item__mainBody').length).toEqual(1)
  })
  it('renders h1 text from props', () => {
    const props = {
      ui: {
        hydrated: true
      },
      data: {
        skuDetails: {
          title: 'test title'
        }
      }
    }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('h1').text()).toEqual('test title')
  })
  it('calls load data action before mounting if available', () => {
    const loadData = jest.fn()
    const props = {
      ui: {
        hydrated: true,
        pageError: false
      },
      actions: {
        ui: {
          loadData
        }
      }
    }
    shallow(<App {...props} />, {lifecycleExiremental: true})
    expect(loadData.mock.calls.length).toEqual(1)
  })
})
