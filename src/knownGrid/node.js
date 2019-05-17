
class Node {
  constructor(row, col) {
    this.passable = true
    this.distance = null

    this.coordinates = { row, col }
  }

  setDistance = (int) => {
    this.distance = int
  }
}

export default Node