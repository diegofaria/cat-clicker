import React, { PropTypes } from 'react'

var name, image;

const CatDisplay =({ cat, onIncrementCat }) => {
  return (
    <div className="col-xs-8">
      <div className='panel-heading'>
        <h3 className='panel-title'>{ cat.name } { cat.counter }</h3>
      </div>
      <div className="panel-body">
        <img className="img-thumbnail" width="400px" role="presentation"
        src={ cat.image }
        onClick={ () => onIncrementCat(cat.id) }/>
      </div>
    </div>
  )
}

CatDisplay.propTypes = {
  cat: React.PropTypes.object.isRequired,
  onIncrementCat: React.PropTypes.func,
}

export default CatDisplay
