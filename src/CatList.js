import React from 'react'

const CatList = ({ cats, onSelectCat }) => {
  const catItems = (cats) => {
    return cats.map(function(cat) {

      const isActive = cat.active === true ? 'active':''

      return (
        <li className={`list-group-item ${ isActive }`}
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
