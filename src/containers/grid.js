import React, { Component } from 'react'
import Node from "../components/node"
import KnownGrid from '../knownGrid/grid'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: new KnownGrid(props),
      path: []
    }
  }

  togglePassable = (node) => {
    this.setState(oldState => {
      const { grid } = oldState

      node.passable = !node.passable

      return {
        grid
      }
    })

    console.log(this.state.grid.array)
  }

  start = () => {
    let grid = this.state.grid

    const path = grid.run().reverse()
    const intID = setInterval(() => {
      const node = path.pop()

      this.setState(oldState => {
        const currentPath = oldState.path

        currentPath.push(node)
        return { path: currentPath }
      })

      if (path.length == 0) {
        clearInterval(intID)
      }
    }, 250)
  }

  reset = () => {
    const grid = new KnownGrid(this.props)
    const path = []

    this.setState({
      grid,
      path
    })
  }

  render() {
    const grid = this.state.grid
    return (
      <React.Fragment>
        <div className="grid">
          {
            grid.array.map(row => {
              return (<div className="row">
                {
                  row.map(cell => {
                    return <Node
                      passable={cell.passable}
                      passed={this.state.path.includes(cell)}
                      start={this.state.grid.start === cell}
                      end={this.state.grid.end === cell}
                      distance={cell.distance}
                      onClick={() => this.togglePassable(cell)} />
                  })
                }
              </div>)
            })
          }
          <div className="buttonRow">
            <div className="button"
              onClick={this.start}>Start</div>
            <div className="button"
              onClick={this.reset} >Reset</div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default Grid
