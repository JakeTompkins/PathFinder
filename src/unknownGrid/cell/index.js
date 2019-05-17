class Cell {
  constructor(options) {
    this.passable = options.passable
    this.revealed = false
    this.coordinates = options.coordinates
  }

  setRevealed = () => {
    this.revealed = true
  }
}

export default Node