import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './state/configureStore'
import getInitialState from './state/getInitialState'
import App from './components/app'
const contentId = document.getElementById('myretail')
const store = configureStore(getInitialState(window.initData || {}))

const renderApp = () => {
  render(
    <Provider store={store}>
      <AppContainer>
        <App/>
      </AppContainer>
    </Provider>,
    contentId  
  )
}

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => {
    renderApp()
  })
}

renderApp()
