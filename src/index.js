import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer'
import App from './app'

const store = createStore(reducer)
const rootElement = document.querySelector('.avia-app')
ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
