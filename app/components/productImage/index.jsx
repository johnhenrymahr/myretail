import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Modal, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import './index.less'
class ProductImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idx: 0,
      modal: false
    }
    this.onLargerClick = this.onLargerClick.bind(this)
    this.getItemClickHandler = this.getItemClickHandler.bind(this)
  }

  onLargerClick (e) {
    if (e) {
      e.preventDefault()
    }
    this.setState({
      modal: !this.state.modal
    })
  }

  getItemClickHandler (idx) {
    return function (e) {
      e.preventDefault()
      this.setState({
        selected: idx
      })
    }.bind(this)
  }

  render () {
    const idx = this.state.selected || 0
    const images = this.props.images || []
    const primary = this.props.images[idx]
    let index = 0
    if (images.length) {
      return (
        <div className='myRetail-productImage'>
          <Modal show={this.state.modal} backdrop onHide={this.onLargerClick}>
            <Modal.Header closeButton onHide={this.onLargerClick}/>
            <img src={primary} />
          </Modal>
          <div className='myRetail-productImage__main'>
            <div><img className='myRetail-productImage__main--image' src={primary} /></div>
          </div>
          <div className='myRetail-productImage__fullsize' >
            <a href='' onClick={this.onLargerClick} >
              <span className='glyphicon glyphicon-zoom-in'></span>
              view larger
            </a>
          </div>
          {images.length > 1 &&
            <div className='myRetail-productImage__carousel'>
              <Carousel
                interval={null}
                indicators={false}
                prevIcon={<Glyphicon glyph='menu-left' />}
                nextIcon={<Glyphicon glyph='menu-right' />}

              >
                {_.chunk(images, 3).map((chunk, idx) =>
                  <Carousel.Item key={idx}>
                    <div className='myRetail-productImage__carousel--image'>
                      {chunk.map((item, i) => {
                        const t =
                        <a key={i} href={(index)} onClick={this.getItemClickHandler(index)} >
                          <img src={item} width='62' />
                        </a>
                        index++
                        return t
                      })}
                    </div>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          }
        </div>
      )
    } else {
      return null
    }
  }
}

ProductImage.propTypes = {
  images: PropTypes.array
}

export default ProductImage
