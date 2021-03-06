/**
 * Created by YikaJ on 16/1/17.
 */
'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middleware/api'
import createLoggerMiddleware from 'redux-logger'
import rootReducer from '../reducer'

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware,
  thunkMiddleware,
  createLoggerMiddleware()
)(createStore);

export default function configureStore(initialState){
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // webpack hot module
  if(module.hot){
    module.hot.accept('../reducer', ()=>{
      const nextRootReducer = require('../reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}
