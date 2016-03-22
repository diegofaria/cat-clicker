var React = require('react')
var ReactDOM = require('react-dom')
import { createStore } from 'redux'
var reducer = require('./reducers')
var tests = require('./test-reducer')

tests()

/*
======================
    STORE CREATION
======================
*/
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );
  return store;
}
const initialState = []
const store = createStore(reducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

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
