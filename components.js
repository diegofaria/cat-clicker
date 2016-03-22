const CatAdmin = React.createClass({
    render: function() {
        return (
            <div>
                <input defaultValue={this.props.display.name} ref={ node => { this.input = node }}/>
                <input defaultValue={this.props.display.image} ref={ node => { this.input = node }}/>
                <input defaultValue={this.props.display.counter} ref={ node => { this.input = node }}/>
            </div>
        )
    }
})

const CatDisplay = React.createClass({
    render: function () {
        const cat = this.props.cat
        return (
            <div>
                <h1>{cat.name}</h1>
                <img src={cat.image} onClick={this.props.onIncrement}/>
                <h2>{cat.counter}</h2>
                <CatAdmin display={cat}/>
            </div>
        )
    }
})

const CatList = React.createClass({
    render: function() {
        const cats = this.props.data.map(function(item){
            <li>{item.name}</li>
        })
        return (
            <ul>
                {cats}
            </ul>
        )
    }
})

const CatAdd = React.createClass({
    render: function() {
        return (
            <div>
                <input ref={ node => { this.input = node }}/>
                <input ref={ node => { this.input = node }}/>
                <input ref={ node => { this.input = node }}/>
                <button onClick={this.props.OnAdd}>Add</button>
            </div>
        )
    }
})

const CatBox = React.createClass({
    render: function() {
        return (
            <div>
                <CatDisplay
                    cats={this.props.data}
                    onIncrement={() => store.dispatch({ type: 'INCREMENT' })} />
                <CatList data={this.props.data}/>
                <CatAdd onAdd={() => store.dispatch({ type: 'ADD_CAT' })} />
            </div>
        )
    }
})

const store = createStore(counter)
const render = () => {
    ReactDOM.render(
        <CatBox data={store.getState()} />,
        document.getElementById('root')
    );
}
render()
store.subscribe(render)
