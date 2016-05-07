import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import router from './routes'

import 'antd/lib/index.css'
import './style/app.scss'

// configureStore可以传入初始initialState
const store = configureStore()

render(
  <Provider store={store}>
    {router(store)}
  </Provider>,
  document.getElementById('_react_app')
)