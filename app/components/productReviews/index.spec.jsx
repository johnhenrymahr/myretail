import React from 'react'
import { shallow } from 'enzyme'
import ProductReviews from './index'
import renderer from 'react-test-renderer'

describe('product reviews component spec', () => {
  it('renders total reviews link if there are reveiws', () => {
    const props = {
      totalReviews: 5,
      pro: {},
      con: {}
    }
    const wrapper = shallow(<ProductReviews {...props} />)
    expect(wrapper.find('.myRetail-reviews__overall a').length).toEqual(1)
  })
  it('does not render total reviews link when there are no reveiws', () => {
    const props = {
      totalReviews: 0,
      pro: {},
      con: {}
    }
    const wrapper = shallow(<ProductReviews {...props} />)
    expect(wrapper.find('.myRetail-reviews__overall a').length).toEqual(0)
  })
  it('renders correctly as snapshot', () => {
    const props = {
      overallRating: '5',
      totalReviews: 6,
      pro: {
        rating: '4',
        title: 'really good stuff',
        review: 'I really liked it',
        screenName: 'joe good',
        date: '2016-07-06'
      },
      con: {
        rating: '1',
        title: 'really bad stuff',
        review: 'It was horrible',
        screenName: 'sally bad',
        date: '2016-06-16'
      }
    }
    const tree = renderer
      .create(<ProductReviews {...props} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
