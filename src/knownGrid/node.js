class Coordinates {
  constructor(row, col) {
    this.row = row
    this.col = col
  }
}

class Node {
  constructor(row, col) {
    this.passable = true
    this.distance = null

    this.coordinates = new Coordinates(row, col)
  }

  setDistance = (int) => {
    this.distance = int
  }
}

export default Node