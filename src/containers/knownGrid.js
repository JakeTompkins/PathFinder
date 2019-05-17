import React, { Component } from 'react'
import Node from "../components/node"
import Queue from '../queue'

class Cell {
  constructor(options) {
    this.row = options.row
    this.col = options.col
    this.passable = true
    this.passed = false
    this.distance = null
    this.revealed = options.revealed || true
  }

  togglePassable = () => {
    this.passable = !this.passable
  }

  togglePassed = () => {
    this.passed = !this.passed
  }

  setDistance = distance => {
    this.distance = distance
  }
}

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matrix: [],
      start: null,
      end: null
    }
  }

  componentDidMount() {
    this.populateMatrix()
  }

  populateMatrix = () => {
    const matrix = []
    const { height, width } = this.props

    for (let row = 0; row < height; row++) {
      const arr = []

      for (let col = 0; col < width; col++) {
        const cell = new Cell({ row, col })

        arr.push(cell)
      }

      matrix.push(arr)
    }

    this.setState({
      matrix
    }, () => {
      this.setRandomStartAndEnd()
    })
  }

  getCell = (row, col) => {
    return this.state.matrix[row][col]
  }

  getRandomCell = () => {
    const { height, width } = this.props
    const row = Math.floor(Math.random() * height)
    const col = Math.floor(Math.random() * width)

    return this.getCell(row, col)
  }

  setRandomStartAndEnd = () => {
    const start = this.getRandomCell()
    const end = this.getRandomCell()

    end.setDistance(0)

    this.setState({
      start,
      end
    })
  }

  getAdjacents = cell => {
    const { row, col } = cell
    const { height, width } = this.props

    const top = row > 0 ? this.getCell(row - 1, col) : null
    const bot = row < height - 1 ? this.getCell(row + 1, col) : null
    const left = col > 0 ? this.getCell(row, col - 1) : null
    const right = col < width - 1 ? this.getCell(row, col + 1) : null

    return [top, bot, left, right]
  }

  buildMap() {
    const queue = new Queue(this.state.end)

    while (queue.length > 0) {
      let currentCell = queue.unshift()
      let adjacents = this.getAdjacents(currentCell)

      adjacents.forEach(cell => {
        if (cell === null || cell.distance != null || !cell.passable) { return }
        cell.setDistance(currentCell.distance + 1)
        queue.push(cell)
      })
    }

    this.setState(this.state, () => {
      this.start()
    })
  }

  nextStep = cell => {
    const adjacents = this.getAdjacents(cell)
    console.log(adjacents)

    let min = null
    let minCell = null

    adjacents.forEach(cell => {
      if (cell === null || cell.distance === null) { return }
      if (min === null || min > cell.distance) {
        min = cell.distance
        minCell = cell
      }
    })

    return minCell
  }

  start = () => {
    let currentCell = this.state.start

    const intId = setInterval(() => {

      currentCell = this.nextStep(currentCell)
      if (currentCell === this.state.end) {
        return clearInterval(intId)
      }
      currentCell.togglePassed()
      this.setState(this.state)
    }, 250)

    this.setState({
      intId
    })
  }

  onCellClick = (cell) => {
    cell.togglePassable()
    this.setState(this.state)
  }

  onStartClick = () => {
    this.buildMap()
  }

  onResetClick = () => {
    clearInterval(this.state.intId)
    this.populateMatrix()
  }

  render() {
    return (
      <div className="grid">
        {
          this.state.matrix.map(row => {
            return (
              <div className="row">
                {
                  row.map(cell => {
                    return <Node
                      passed={cell.passed}
                      passable={cell.passable}
                      start={cell === this.state.start}
                      end={cell === this.state.end}
                      revealed={cell.revealed}
                      onClick={() => this.onCellClick(cell)}
                    />
                  })
                }
              </div>
            )
          })
        }
        <div className="buttonRow">
          <div className="button"
            onClick={() => { this.onStartClick() }}>Start</div>
          <div className="button"
            onClick={() => { this.onResetClick() }}>Reset</div>
        </div>
      </div>
    )
  }
}

export default Grid