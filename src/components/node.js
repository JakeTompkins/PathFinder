import React, { Component } from 'react'

class Node extends Component {
  render() {
    const { passable, start, end, passed, distance } = this.props
    return (
      <div className={`node${passable ? "" : " unpassable"}${start ? " start" : ""}${end ? " end" : ""}${passed ? " passed" : ""}`}
        onClick={this.props.onClick} />
    )
  }
}

export default Node