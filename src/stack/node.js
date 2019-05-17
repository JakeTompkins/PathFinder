class Node {
  constructor(cell) {
    this.cell = cell
    this.visited = false
  }

  markVisited = () => {
    this.visited = true
  }
}

export default Node