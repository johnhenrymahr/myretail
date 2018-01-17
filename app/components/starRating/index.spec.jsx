import React from 'react'
import { shallow } from 'enzyme'
import StarRating from './index'

describe('star rating component', () => {
  it('does not render if rating is not provided', () => {
    const wrapper = shallow(<StarRating/>)
    expect(wrapper.type()).toEqual(null)
  })
  it('renders 1 star reveiw', () => {
    const wrapper = shallow(<StarRating rating={1} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(false)
  })
  it('renders 2 star reveiw', () => {
    const wrapper = shallow(<StarRating rating={2} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(false)
  })
  it('renders 2 star reveiw when string provided', () => {
    const wrapper = shallow(<StarRating rating='2' />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(false)
  })
  it('renders 3 star reveiw', () => {
    const wrapper = shallow(<StarRating rating={3} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(false)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(false)
  })
  it('renders 4 star reveiw', () => {
    const wrapper = shallow(<StarRating rating={4} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(false)
  })
  it('renders 5 star reveiw', () => {
    const wrapper = shallow(<StarRating rating={5} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(true)
  })
  it('renders 5 star reveiw even if larger number rpovided', () => {
    const wrapper = shallow(<StarRating rating={9} />)
    expect(wrapper.find('span.star').at(0).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(1).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(2).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(3).hasClass('star--selected')).toEqual(true)
    expect(wrapper.find('span.star').at(4).hasClass('star--selected')).toEqual(true)
  })
})
