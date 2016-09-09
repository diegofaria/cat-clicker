import React, { Component } from 'react'

class CatDisplay extends Component {
  render() {
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
}

export default CatDisplay
