import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import messages from './reducers/messages'
import dialogs from './reducers/dialogs'

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    messages,
    dialogs,
    routing: routerReducer
  })

   let blacklistTransform = createTransform(
     (inboundState, key) => {
         if (key !== 'messages') {
            return inboundState
         } else {
            return {
               dialog: inboundState.dialog
            }
         }
     }
   )

  const persistConfig = {
      key: 'messages',
      whitelist: ['messages'],
      transforms: [blacklistTransform],
      storage,
   }


   const persistedReducer = persistReducer(persistConfig, reducer)

   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

   const store = createStore(
      persistedReducer,
      initialState,
      composeEnhancers(
         applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history)
         )
      )
   )
   
   let persistor = persistStore(store)

   return { store, persistor }
}
