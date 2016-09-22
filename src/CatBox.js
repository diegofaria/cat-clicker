import React from 'react'
import { connect } from 'react-redux'
import CatList from './CatList'
import CatDisplay from './CatDisplay'

const CatBox = ( props ) => {
  return (
    <div className='row'>
      <CatList
        cats={ props.cats }
        onSelectCat={ props.onSelectCat } />
      <CatDisplay
        className='panel panel-default'
        cat={ props.selectedCat }
        onIncrementCat={ props.onIncrementCat } />
    </div>
  )
}

CatBox.propTypes = {
  selectedCat: React.PropTypes.object,
  cats: React.PropTypes.array.isRequired,
  onSelectCat: React.PropTypes.func,
  onIncrementCat: React.PropTypes.func
}

const getSelectedCat = (state) => {
  return state.filter(function(cat) {
    return cat.active === true
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
