import React from 'react'
import { path } from 'ramda'
import { FormattedMessage } from 'react-intl'

import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'showingProducts',
  'showingProductsCount',
  'showingProductsContainer',
  'showingAllProductsCount',
  'progressBar',
  'progressBarFiller',
]

const ProductCountPerPage = () => {
  const { searchQuery } = useSearchPage()

  const handles = useCssHandles(CSS_HANDLES)
  const products =
    path(['data', 'productSearch', 'products'], searchQuery) || []
  const recordsFiltered = path(
    ['data', 'productSearch', 'recordsFiltered'],
    searchQuery
  )

  const productsLoadedPercentage = Math.round(
    (100 * products.length) / recordsFiltered
  )
  if (products.length === 0) {
    return null
  }

  return (
    <div
      className={`${handles.showingProductsContainer} flex flex-column justify-center items-center`}
    >
      <div className={`${handles.showingProducts} tc t-small pt3 c-muted-2`}>
        {productsLoadedPercentage !== 100 ? (
          <FormattedMessage
            id="store/search-result.showing-products"
            tagName="span"
            values={{
              value: (
                <span className={`${handles.showingProductsCount} b`}>
                  <FormattedMessage
                    id="store/search-result.showing-products-count"
                    values={{
                      productsLoaded: products.length,
                      total: recordsFiltered,
                    }}
                  />
                </span>
              ),
            }}
          />
        ) : (
          <FormattedMessage
            id="store/search-result.showing-all-products"
            tagName="span"
            values={{
              value: (
                <span className={`${handles.showingAllProductsCount} b`}>
                  <FormattedMessage
                    id="store/search-result.showing-all-products-count"
                    values={{
                      total: recordsFiltered,
                    }}
                  />
                </span>
              ),
            }}
          />
        )}
      </div>
      {productsLoadedPercentage && (
        <div
          className={`${handles.progressBar} relative flex bg-action-secondary items-center mt4 br3 w-50 h1`}
        >
          <span
            className={`${handles.progressBarFiller} absolute br3 bg-action-primary h1`}
            style={{ width: `${productsLoadedPercentage}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default ProductCountPerPage
