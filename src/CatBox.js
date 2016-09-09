import React, { Component } from 'react';
import CatList from './CatList'
import CatDisplay from './CatDisplay'

class CatBox extends Component {
  render() {
    var selectedCat = this.props.data.filter(function(cat) {
      return cat.active == true
    })[0]

    return (
      <div className='row'>
        <CatList
          data={this.props.data}
          onSelect={(id) => this.props.dispatch({ type: 'ACTIVATE_CAT', id: id })} />
        <CatDisplay
          className='panel panel-default'
          cat={selectedCat}
          onIncrement={(id) => this.props.dispatch({ type: 'INCREMENT', id: id })} />
      </div>
    )
  }
}

export default CatBox
