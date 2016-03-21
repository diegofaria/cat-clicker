var React = require('react')
var ReactDOM = require('react-dom')
var deepFreeze = require('deep-freeze');
import expect from 'expect'
import { createStore } from 'redux'

const counter = (state = {name: 'cat 1', image: 'https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg', counter: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, {counter: state.counter + 1})
        default:
            return state
    }
}

const testIncrementCounter = () => {
    const stateBefore = {
        name: '',
        image: '',
        counter: 0
    }
    const stateAfter = {
        name: '',
        image: '',
        counter: 1
    }

    deepFreeze(stateBefore)

    expect(stateBefore).toEqual(stateBefore)
}

testIncrementCounter()
console.log('All tests passed.')

const store = createStore(counter)

const CatDisplay = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{this.props.display.name}</h1>
                <img src={this.props.display.image} onClick={this.props.onIncrement}/>
                <h2>{this.props.display.counter}</h2>
                <CatAdmin display={display}/>
            </div>
        )
    }
)

const CatAdmin = React.createClass({
    render: function() {
        return (
            <div>
                <input type="text" value={this.props.display.name}/>
                <input type="text" value={this.props.display.image}/>
                <input type="text" value={this.props.display.counter}/>
            </div>
        )
    }
)

console.log(store.getState())

const render = () => {
    ReactDOM.render(
        <CatDisplay
            display={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })} />,
        document.getElementById('root')
    );
}

render()
store.subscribe(render)
