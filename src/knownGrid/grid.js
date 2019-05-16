import Node from './node'

class Queue {
  constructor(node) {
    this.head = { node, next: null }
    this.length = 1
  }

  push = node => {
    if (!this.head) {
      this.head = { node, next: null }
      this.length++
      return
    }

    let tail = this.head

    while (tail.next != null) {
      tail = tail.next
    }

    tail.next = { node, next: null }
    this.length++
  }

  unshift = () => {
    const nodeObj = this.head
    this.head = this.head.next
    this.length--

    return nodeObj.node
  }
}

class Grid {
  constructor(options) {
    this.height = options.height
    this.width = options.width

    this.array = []
    this.populateArray(options)

    this.start = this.randomCell(this.height, this.width)
    this.end = this.randomCell(this.height, this.width)
  }

  randomCell = (rows, cols) => {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)

    return this.getNode(row, col)
  }

  populateArray = (options) => {
    const { height, width } = options


    for (let r = 0; r < height; r++) {
      const newArr = []

      for (let c = 0; c < width; c++) {
        const newNode = new Node(r, c)

        newArr.push(newNode)
      }

      this.array.push(newArr)
    }

    return this.array
  }

  getNode = (row, col) => {
    return this.array[row][col]
  }

  setStart = (row, col) => {
    this.start = this.getNode(row, col)
  }

  setEnd = (row, col) => {
    this.end = this.getNode(row, col)
  }

  getAdjacents = node => {
    const row = node.coordinates.row
    const col = node.coordinates.col

    const top = row > 0 ? this.array[row - 1][col] : null
    const bot = row < this.width - 1 ? this.array[row + 1][col] : null
    const left = col > 0 ? this.array[row][col - 1] : null
    const right = col < this.width - 1 ? this.array[row][col + 1] : null

    return [top, bot, left, right].filter(node => node)
  }

  buildMap = () => {
    const end = this.end

    end.setDistance(0)

    const queue = new Queue(end)
    let currentNode = null
    let adjacents = []

    while (queue.length > 0) {
      currentNode = queue.unshift()
      adjacents = this.getAdjacents(currentNode)

      adjacents.forEach(node => {
        if (node && node.passable && node.distance === null) {
          node.setDistance(currentNode.distance + 1)
          queue.push(node)
        }
      })
    }
  }

  findMinimumAdjacent = node => {
    const adjacents = this.getAdjacents(node)

    let min = null
    let minNode = null

    adjacents.forEach(node => {
      if (node.distance === null) { return }

      if (min === null || min > node.distance) {
        min = node.distance
        minNode = node
      }
    })

    return minNode
  }

  findPath = () => {
    const start = this.start
    const end = this.end

    const path = []
    const queue = new Queue(start)
    let currentNode = null

    while (queue.length > 0) {
      currentNode = queue.unshift()
      if (currentNode === end) { break }

      let minAdjacent = this.findMinimumAdjacent(currentNode)
      path.push(minAdjacent)
      queue.push(minAdjacent)
    }

    return path
  }

  run = () => {
    this.buildMap()
    return this.findPath()
  }
}

export default Grid