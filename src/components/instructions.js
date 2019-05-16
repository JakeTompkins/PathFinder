import React from 'react'

export default function Instructions(props) {
  return (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>PathFinder is a demonstration of a breadth-first path finding algorithm. The algorithm will begin from the <strong>green</strong> starting square and find the shortest path to the <strong>red</strong> ending square. Click the white squares in order to create a maze for the algorithm to solve. When you're ready, click <strong>Start</strong>, and if you want to play again, click <strong>Reset</strong></p>
    </div>
  )
}