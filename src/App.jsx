import { useState } from 'react'
import Mapgl from "./components/MapGl/Mapgl.jsx";
import {MapglContextProvider} from "./components/MapGl/MapglContext.jsx";

function App() {
  return (
      <MapglContextProvider>
          <div className='App-map-container'>
            <Mapgl />
          </div>
      </MapglContextProvider>
  );
}

export default App
