import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import tests from './test-reducer'
import App from './App'

tests()

/*
======================
    STORE CREATION
======================
*/
const initialState = [
    {id: 0, name: 'china cat', image: 'http://img.memecdn.com/im-a-cat-and-im-from-china_o_284394.jpg', counter: 0, active: true},
    {id: 1, name: 'mexican cat', image: 'http://www.girlmeetsfood.com/wp-content/uploads/2012/04/mexican-cat.jpg', counter: 0, active: false},
    {id: 2, name: 'irish cat', image: 'http://www.somuchviral.com/wp-content/uploads/2014/03/irish-cat.jpg', counter: 0, active: false},
    {id: 3, name: 'russian cat', image: 'http://img.memecdn.com/Russian-Cat_o_138101.jpg', counter: 0, active: false}
]

const store = createStore(reducers, initialState, window.devToolsExtension && window.devToolsExtension())

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()

store.subscribe(renderApp)
