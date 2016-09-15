import React, { Component } from 'react'
import { connect } from 'react-redux'
import CatList from './CatList'
import CatDisplay from './CatDisplay'

class CatBox extends Component {
  render() {
    return (
      <div className='row'>
        <CatList
          cats={ this.props.cats }
          onSelectCat={ this.props.onSelectCat } />
        <CatDisplay
          className='panel panel-default'
          cat={ this.props.selectedCat }
          onIncrement={ this.props.onIncrementCat } />
      </div>
    )
  }
}

const getSelectedCat = (state) => {
  return state.filter(function(cat) {
    return cat.active == true
  })[0]
}

const mapStateToProps = (state) => {
  return {
    cats: state,
    selectedCat: getSelectedCat(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCat: (id) => dispatch({ type: 'INCREMENT', id: id }),
    onSelectCat: (id) => dispatch({ type: 'ACTIVATE_CAT', id: id })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatBox)
