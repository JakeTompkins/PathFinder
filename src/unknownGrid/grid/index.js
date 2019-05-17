import Cell from '../cell'
import Stack from '../../stack'

class Grid {
  constructor(options) {
    this.height = options.height
    this.width = options.width

    this.array = this.buildMap(options)
    this.start = this.randomCell()
    this.end = this.randomCell()
    this.current = this.start

    this.stack = new Stack()
  }

  buildMap = (options) => {
    const { height, width } = options
    const newArr = []

    for (let r = 0; r < height; r++) {
      const row = []

      for (let c = 0; c < width; c++) {
        const passable = Math.floor(Math.random() * 2)
        const coordinates = { row: r, col: c }
        const cell = new Cell({ coordinates, passable })

        row.push(cell)
      }

      newArr.push(row)
    }
  }

  getCell = (row, col) => {
    return this.array[row][col]
  }

  randomCell = () => {
    const row = Math.floor(Math.random() * this.height)
    const col = Math.floor(Math.random() * this.width)

    return this.getCell(row, col)
  }

  lookUp = cell => {
    const { row, col } = cell.coordinates

    if (row > 0) {
      const adjacent = this.array[row - 1][col]
    }

    return adjacent.visited || !adjacent.passable ? null : adjacent
  }

  lookDown = cell => {
    const { row, col } = cell.coordinates

    if (row < this.height - 1) {
      const adjacent = this.array[row + 1][col]
    }

    return adjacent.visited || !adjacent.passable ? null : adjacent
  }

  lookLeft = cell => {
    const { row, col } = cell.coordinates

    if (col > 0) {
      const adjacent = this.array[row][col - 1]
    }

    return adjacent.visited || !adjacent.passable ? null : adjacent
  }

  lookRight = cell => {
    const { row, col } = cell.coordinates

    if (col < this.width - 1) {
      const adjacent = this.array[row][col + 1]
    }

    return adjacent.visited || !adjacent.passable ? null : adjacent
  }

  findAdjacent = cell => {
    const { row, col } = cell.coordinates

    const adjacent = this.lookUp(cell) ||
      this.lookDown(cell) ||
      this.lookLeft(cell) ||
      this.lookRight(cell)

    return adjacent
  }

  nextStep = () => {
    if (this.current === null) {
      return null
    }
    let nextCell = this.findAdjacent(this.current)

    if (!nextCell) {
      this.current = this.stack.pop()
      return this.nextStep()
    } else {
      this.stack.push(nextCell)
      this.current = nextCell
      return this.current
    }
  }
}