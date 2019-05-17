import Node from "./node"

class Stack {
  constructor() {
    this.array = []
    this.currentNode = null
  }

  push = cell => {
    const newNode = new Node(cell)

    this.array.push(newNode)
  }

  pop = () => {
    return this.array.pop()
  }
}

export default Stack

// add a node
// node must have array(stack) of adjacent nodes
// Because the computer doesn't know the state of the board, adjacent nodes are added dynamically
// Nodes have a next function that pops an adjacent mode from the array
// Nodes have a visited Property. If a node has been visited already, it is ignored
// Web is a giant stack

// FLOW:
// add a node to the web
// pop adjacent node off current node
// if adjacent node is unvisited, add it to the web stack
// otherwise pop again
// End when either current node is end, OR can't pop off of Web anymore
