import React from 'react';
import Grid from './containers/knownGrid'

function App() {
  return (
    <div className="main">
      <h1 className="title">PathFinder</h1>
      <div className="container">
        <Grid height={10}
          width={10} />
      </div>
    </div>
  )
}

export default App;
