import React, { Component } from 'react';

class CatList extends Component {
  render() {
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
}

export default CatList
