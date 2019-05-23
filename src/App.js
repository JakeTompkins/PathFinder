import React from 'react';
import KnownGrid from './containers/knownGrid'
import UnknownGrid from "./containers/unknownGrid"
import GridSwitcher from "./containers/gridSwitcher"

function App() {
  return (
    <div className="main">
      <h1 className="title">PathFinder</h1>
      <div className="container">
        <GridSwitcher
          grids={[<KnownGrid height={10}
            width={10} />,
          <UnknownGrid
            height={10}
            width={10}
          />]} />
      </div>
    </div>
  )
}

export default App;
