var React = require('react')
var ReactDOM = require('react-dom')
var deepFreeze = require('deep-freeze');
import expect from 'expect'
import { createStore } from 'redux'

const cat = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CAT':
            return {
                id: action.cat.id,
                name: action.cat.name,
                image: action.cat.image,
                counter: action.cat.counter,
                active: action.cat.active
            }
        case 'ACTIVATE_CAT':
            if (state.id !== action.id)
                return Object.assign({}, state, {active: false})
            return Object.assign({}, state, {active: true})
        case 'INCREMENT':
            if (state.active)
                return Object.assign({}, state, {counter: state.counter+1})
            return state
        default:
            return state
    }
}

const cats = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CAT':
            return [
                ...state,
                cat(undefined, action)
            ]
        case 'ACTIVATE_CAT':
            return state.map(c => {
                return cat(c, action)
            })
        case 'INCREMENT':
            return state.map(c => {
                return cat(c, action)
            })
        default:
            return state
    }
}

const testAddCat = () => {
    const stateBefore = []
    const action = {
        type: "ADD_CAT",
        cat: {id: 0, name: '', image: '', counter: 1, active: false}
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: false}
    ]

    deepFreeze(stateBefore)

    expect(
        cats(stateBefore, action)
    ).toEqual(stateAfter)
}
testAddCat()

const testIncrementCat = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 1, active: true}
    ]
    const action = {type: "INCREMENT"}
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 2, active: true}
    ]

    deepFreeze(stateBefore)

    expect(
        cats(stateBefore, action)
    ).toEqual(stateAfter)
}
testIncrementCat()

const testActivateCat = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false}
    ]
    const action = {
        type: "ACTIVATE_CAT",
        id: 0
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: true}
    ]

    deepFreeze(stateBefore)

    expect(
        cats(stateBefore, action)
    ).toEqual(stateAfter)
}
testActivateCat()

const testActivateOneCatDeactiveOthers = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 1, active: true},
        {id: 2, name: '', image: '', counter: 1, active: false}
    ]
    const action = {
        type: "ACTIVATE_CAT",
        id: 0
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: true},
        {id: 1, name: '', image: '', counter: 1, active: false},
        {id: 2, name: '', image: '', counter: 1, active: false}
    ]

    deepFreeze(stateBefore)

    expect(
        cats(stateBefore, action)
    ).toEqual(stateAfter)
}
testActivateOneCatDeactiveOthers()
console.log('All tests passed.')

const store = createStore(cats)

store.dispatch({
    type: "ADD_CAT",
    cat: {id: 0, name: 'china cat', image: 'http://img.memecdn.com/im-a-cat-and-im-from-china_o_284394.jpg', counter: 0, active: true}
})
store.dispatch({
    type: "ADD_CAT",
    cat: {id: 1, name: 'mexican cat', image: 'http://www.girlmeetsfood.com/wp-content/uploads/2012/04/mexican-cat.jpg', counter: 0, active: false}
})
store.dispatch({
    type: "ADD_CAT",
    cat: {id: 2, name: 'irish cat', image: 'http://www.somuchviral.com/wp-content/uploads/2014/03/irish-cat.jpg', counter: 0, active: false}
})
store.dispatch({
    type: "ADD_CAT",
    cat: {id: 3, name: 'russian cat', image: 'http://img.memecdn.com/Russian-Cat_o_138101.jpg', counter: 0, active: false}
})

const CatList = React.createClass({
    render: function() {
        var onSelectCat = this.props.onSelect
        const cats = this.props.data.map(function(cat){
            return (
                <li key={cat.id}
                    onClick={() => {
                        onSelectCat(cat.id)
                    }}>
                    {cat.name}
                </li>
            )
        })
        return (
            <ul>
                {cats}
            </ul>
        )
    }
})

const CatDisplay = React.createClass({
    render: function() {
        var cat = this.props.cat
        return (
            <div>
                <h1>{cat.name}</h1>
                <img src={cat.image} onClick={() => {this.props.onIncrement(cat.id)}}/>
                <h2>{cat.counter}</h2>
            </div>
        )
    }
})

const CatBox = React.createClass({
    render: function() {
        var selectedCat = this.props.data.filter(function(cat){
            return cat.active == true
        })[0]

        return (
            <div>
                <CatDisplay
                    cat={selectedCat}
                    onIncrement={(id) => store.dispatch({ type: 'INCREMENT', id: id })} />
                <CatList data={this.props.data}
                    onSelect={(id) => store.dispatch({ type: 'ACTIVATE_CAT', id: id })} />
            </div>
        )
    }
})


const render = () => {
    ReactDOM.render(
        <CatBox data={store.getState()} />,
        document.getElementById('root')
    );
}
render()
store.subscribe(render)
