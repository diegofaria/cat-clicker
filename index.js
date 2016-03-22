var React = require('react')
var ReactDOM = require('react-dom')
var deepFreeze = require('deep-freeze');
import expect from 'expect'
import { createStore } from 'redux'

/*
======================
    REDUCERS
======================
*/

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

/*
======================
    REDUCERS TESTS
======================
*/
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

/*
======================
    STORE CREATION
======================
*/
const store = createStore(cats)


/*
======================
    INITIAL STATE
======================
*/
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



/*
======================
    REACT COMPONENTS
======================
*/
const CatAdmin = React.createClass({
    render: function() {
        console.log(this.props.cat.name)
        return (
            <div>
                <input defaultValue={this.props.cat.name} ref={ node => { this.input = node }}/>
                <input defaultValue={this.props.cat.image} ref={ node => { this.input = node }}/>
                <input defaultValue={this.props.cat.counter} ref={ node => { this.input = node }}/>
            </div>
        )
    }
})

const CatDisplay = React.createClass({
    render: function() {
        var cat = this.props.cat
        return (
            <div className="col-xs-8">
                <div className='panel-heading'>
                    <h3 className='panel-title'>{cat.name} {cat.counter}</h3>
                </div>
                <div className="panel-body">
                    <img className="img-thumbnail" width="400px"
                        src={cat.image}
                        onClick={() => {this.props.onIncrement(cat.id)}}/>
                </div>
            </div>
        )
    }
})

const CatList = React.createClass({
    render: function() {
        var onSelectCat = this.props.onSelect
        const cats = this.props.data.map(function(cat){
            const activeClass = cat.active == true ? 'active':''
            return (
                <li className='list-group-item {activeClass}'
                    key={cat.id}
                    onClick={() => {
                        onSelectCat(cat.id)
                    }}>
                    <span className="badge">{cat.counter}</span>
                    {cat.name}
                </li>
            )
        })
        return (
            <ul className='list-group col-xs-4'>
                {cats}
            </ul>
        )
    }
})

const CatBox = React.createClass({
    render: function() {
        var selectedCat = this.props.data.filter(function(cat){
            return cat.active == true
        })[0]

        return (
            <div className='row'>
                <CatList
                    data={this.props.data}
                    onSelect={(id) => store.dispatch({ type: 'ACTIVATE_CAT', id: id })} />
                <CatDisplay
                    className='panel panel-default'
                    cat={selectedCat}
                    onIncrement={(id) => store.dispatch({ type: 'INCREMENT', id: id })} />
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
