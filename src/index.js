import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import CatBox from './CatBox'
import reducer from './reducers'
import tests from './test-reducer'


// tests()

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
const store = createStore(reducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

const render = () => {
    ReactDOM.render(
        <CatBox data={store.getState()} dispatch={store.dispatch}/>,
        document.getElementById('root')
    );
}

render()
store.subscribe(render)
