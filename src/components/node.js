import React, { Component } from 'react'

class Node extends Component {

  render() {
    const { passable, start, end, passed, distance, revealed } = this.props
    return (
      <div className={`node${passable ? "" : " unpassable"}${start ? " start" : ""}${end ? " end" : ""}${passed ? " passed" : ""}${revealed ? " revealed" : ""}`}
        onClick={this.props.onClick} />
    )
  }
}

export default Node