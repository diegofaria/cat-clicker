import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const CatList = ({ cats, onSelectCat }) => {
  const catItems = (cats) => {
    return cats.map(function(cat) {

      const activeClass = cat.active == true ? 'active':''

      return (
        <li className='list-group-item {activeClass}'
          key={ cat.id }
          onClick={() => {
            onSelectCat(cat.id)
        }}>
          <span className="badge">{ cat.counter }</span>
          { cat.name }
        </li>
      )

    })
  }

  return (
    <ul className='list-group col-xs-4'>
      { catItems(cats) }
    </ul>
  )
}

export default CatList
