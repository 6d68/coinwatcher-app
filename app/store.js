import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'

import thunk from 'redux-thunk'

import { createLogger } from 'redux-logger'

import reducer from './reducers/index'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
  require('./config/ReactotronConfig')
}

export default () => {
  const store = createStore(
      reducer,
      undefined,
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  
    // Enable persistence
    persistStore(store, 
      {
        storage: AsyncStorage,
        debounce: 50
      })
 /* 
  const store = autoRehydrate()(createStore)(reducer, middleware);
  persistStore(store, {
    storage: AsyncStorage,
    debounce: 50
  });
  */
  return store
}