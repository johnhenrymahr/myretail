import _ from 'lodash'
export default function (source) {
  const data = {}
  data.images = getImages(source)
  data.skuDetails = getSkuDetails(source)
  data.promotions = getPromotions(source)
  data.availabilty = getAvailability(source)
  data.pricing = getPricing(source)
  data.features = getFeatures(source)
  data.reviews = getReviews(source)
  return data
}

export function getImages (source) {
  const images = _.get(source, 'CatalogEntryView[0].Images[0].AlternateImages', []).map((item) => {
    return item.image
  })
  const primaryImage = _.get(source, 'CatalogEntryView[0].Images[0].PrimaryImage[0].image')
  if (primaryImage) {
    images.unshift(primaryImage)
  }
  return images
}


export function getPricing (source) {
  return {
    price: _.get(source, 'CatalogEntryView[0].Offers[0].OfferPrice[0].formattedPriceValue', null),
    qualifier: _.get(source, 'CatalogEntryView[0].Offers[0].OfferPrice[0].priceQualifier', null)
  }
}

export function getSkuDetails (source) {
  const base = _.get(source, 'CatalogEntryView[0]', {})
  return {
    quantity: 1,
    title: base.title,
    id: base.itemId,
    type: base.itemType,
    classId: base.classId
  }  
}

export function getPromotions (source) {
  return _.get(source, 'CatalogEntryView[0].Promotions', []).map((item) => {
    return _.get(item, 'Description[0].shortDescription', '')
  })
}

export function getAvailability (source) {
  const channelCode = parseInt(_.get(source, 'CatalogEntryView[0].purchasingChannelCode', 0), 10)
  return {
    online: Boolean( channelCode === 0 || channelCode === 1 ),
    instore: Boolean( channelCode === 0 || channelCode === 2 )
  }
}

export function getFeatures(source) {
  return _.get(source, 'CatalogEntryView[0].ItemDescription[0].features', []).map((item) => {
    const key = item.match(/<strong>(.*?)<\/strong>/g)
    const val = item.replace((key[0] || ''), '')
    return {
      k: (key[0] || '').replace(/<[^>]*>/g, ''),
      v: val.trim()
    }
  })
}

export function getReviews (source) {
  return {
    overallRating: _.get(source, 'CatalogEntryView[0].CustomerReview[0].consolidatedOverallRating'),
    totalReviews: _.get(source, 'CatalogEntryView[0].CustomerReview[0].totalReviews'),
    pro: {
      rating: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Pro[0].overallRating'),
      screenName: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Pro[0].screenName'),
      title: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Pro[0].title'),
      review: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Pro[0].review'),
      date: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Pro[0].datePosted')
    },  
    con: {
      rating: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Con[0].overallRating'),
      screenName: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Con[0].screenName'),
      title: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Con[0].title'),
      review: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Con[0].review'),
      date: _.get(source, 'CatalogEntryView[0].CustomerReview[0].Con[0].datePosted')
    }  
  }
}

