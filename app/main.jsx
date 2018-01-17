
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './state/configureStore'
import getInitialState from './state/getInitialState'
import App from './components/app'
const contentId = document.getElementById('myretail')
const store = configureStore(getInitialState(window.initData || {}))

const renderApp = (Component) => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    contentId
  )
}
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => {
    console.log('render app')
    renderApp(App)
  })
}

renderApp(App)
