import { readFileSync } from 'jsonfile'
import { getImages, getPromotions, getAvailability, getSkuDetails, getPricing, getFeatures, getReviews } from './dataMapper'

const data = readFileSync('routes/data/item-data.json')

describe('dataMapper spec', () => {
  context('getImages', () => {
    it('it extracts images', () => {
      const images = getImages(data)
      expect(images[0]).toEqual('http://target.scene7.com/is/image/Target/14263758')
      expect(images[1]).toEqual('http://target.scene7.com/is/image/Target/14263758_Alt01')
      expect(images.length).toEqual(8)
    })
  })
  context('getPromotions', () => {
    it('returns correct promotion copy', () => {
      expect(getPromotions(data)).toEqual(['SPEND $50, GET FREE SHIPPING', '$25 gift card with purchase of a select Ninja Blender'])
    })
  })
  context('getAvailability', () => {
    it('set getAvailability for code 0', () => {
      const d = {
        CatalogEntryView: [
          {
            purchasingChannelCode: 0
          }
        ]
      }
      expect(getAvailability(d).online).toEqual(true)
      expect(getAvailability(d).instore).toEqual(true)
    })
    it('set getAvailability for code 1', () => {
      const d = {
        CatalogEntryView: [
          {
            purchasingChannelCode: '1'
          }
        ]
      }
      expect(getAvailability(d).online).toEqual(true)
      expect(getAvailability(d).instore).toEqual(false)
    })
    it('set avaialbiltiy for code 2', () => {
      const d = {
        CatalogEntryView: [
          {
            purchasingChannelCode: 2
          }
        ]
      }
      expect(getAvailability(d).online).toEqual(false)
      expect(getAvailability(d).instore).toEqual(true)
    })
  })
  context('getSkuDetails export', () => {
    it('extracts title', () => {
      expect(getSkuDetails(data).title).toEqual('Ninja™ Professional Blender with Single Serve Blending Cups')
    })
  })
  context('getPricing', () => {
    it('gets prcie info', () => {
      expect(getPricing(data).price).toEqual('$139.99')
      expect(getPricing(data).qualifier).toEqual('Online Price')
    })
  })
  context('getFeatures', () => {
    it('parses feature corectly', () => {
      expect(getFeatures(data)[0])
        .toEqual({
          k: 'Wattage Output:',
          v: '1100 Watts'
        })
    })
  })
  context('getReviews export', () => {
    it('renders a pro object', () => {
      expect(getReviews(data).pro)
        .toEqual({
          rating: '5',
          screenName: 'Eric',
          title: 'Fantastic Blender',
          review: 'This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!',
          date: 'Thu Apr 18 19:42:19 UTC 2013'
        })
    })
    it('renders a con object', () => {
      expect(getReviews(data).con)
        .toEqual({
          rating: '1',
          screenName: 'New York',
          title: 'Very unhappy',
          review: 'Less than 2 months after purchase it completely stopped working. First it wouldn\'t detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn\'t detect the single serve cup. ',
          date: 'Mon Mar 11 13:13:55 UTC 2013'
        })
    })
    it('extracts extra props', () => {
      expect(getReviews(data).overallRating).toEqual('4')
      expect(getReviews(data).totalReviews).toEqual('14')
    })
  })
})
