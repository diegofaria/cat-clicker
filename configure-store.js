
import { createStore, applyMiddleware, compose } from 'redux';
var thunk = require('redux-thunk').default;
import devTools from 'remote-redux-devtools';
import reducer from './reducers';

 configureStore = function(initialState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        devTools()
    );
    // Note: passing enhancer as last argument requires redux@>=3.1.0
    return createStore(reducer, initialState, enhancer);
}

module.exports = configureStore
