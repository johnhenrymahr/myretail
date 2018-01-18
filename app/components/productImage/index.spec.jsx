import React from 'react'
import ProductImage from './index'
import { Carousel, Modal } from 'react-bootstrap'
import { shallow } from 'enzyme'

describe('Product Image component spec', () => {
  it('returns null if there are no images', () => {
    const props = {
      images: []
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.type()).toEqual(null)
  })
  it('renders a main image if there is at least 1 image in images array', () => {
    const props = {
      images: ['/path/images/test1.jpg']
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find('img.myRetail-productImage__main--image').length).toEqual(2)
  })
  it('does not render the carousel when there is only 1 image', () => {
    const props = {
      images: ['/path/images/test1.jpg']
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find('.myRetail-productImage__carousel').length).toEqual(0)
  })
  it('does render the carousel when there is more than 1 image', () => {
    const props = {
      images: ['/path/images/test1.jpg', '/path/images/test2.jpg']
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find('.myRetail-productImage__carousel').length).toEqual(1)
  })
  it('renders chunks of images inside of caousel items', () => {
    const props = {
      images: [
        '/path/images/test1.jpg',
        '/path/images/test2.jpg',
        '/path/images/test3.jpg',
        '/path/images/test4.jpg',
        '/path/images/test5.jpg'
      ]
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find(Carousel.Item).length).toEqual(2)
    expect(wrapper.find(Carousel.Item).at(0).find('img').length).toEqual(3)
    expect(wrapper.find(Carousel.Item).at(1).find('img').length).toEqual(2)
  })
  it('renders sequential indexes for images in sequential chunks', () => {
    const props = {
      images: [
        '/path/images/test1.jpg',
        '/path/images/test2.jpg',
        '/path/images/test3.jpg',
        '/path/images/test4.jpg',
        '/path/images/test5.jpg'
      ]
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find(Carousel.Item).at(0).find('a').at(1).props()['href']).toEqual(1)
    expect(wrapper.find(Carousel.Item).at(1).find('a').at(1).props()['href']).toEqual(4)
  })
  it('updates main image when clicking carousel item', () => {
    const props = {
      images: [
        '/path/images/test1.jpg',
        '/path/images/test2.jpg',
        '/path/images/test3.jpg',
        '/path/images/test4.jpg',
        '/path/images/test5.jpg'
      ]
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find('img.myRetail-productImage__main--image').at(0).props()['src'])
      .toEqual('/path/images/test1.jpg')
    wrapper.find(Carousel.Item).at(1).find('a').at(0).simulate('click', { preventDefault: jest.fn() })
    expect(wrapper.find('img.myRetail-productImage__main--image').at(0).props()['src'])
      .toEqual('/path/images/test4.jpg')
    expect(wrapper.find(Modal).find('img').props().src)
      .toEqual('/path/images/test4.jpg')
  })
  it('Opens a modal when the show larger link is clicked', () => {
    const props = {
      images: [
        '/path/images/test1.jpg',
        '/path/images/test2.jpg',
        '/path/images/test3.jpg',
        '/path/images/test4.jpg',
        '/path/images/test5.jpg'
      ]
    }
    const wrapper = shallow(<ProductImage {...props} />)
    expect(wrapper.find(Modal).props().show).toEqual(false)
    wrapper.find('.myRetail-productImage__fullsize a').simulate('click', { preventDefault: jest.fn() })
    expect(wrapper.find(Modal).props().show).toEqual(true)
  })
})
