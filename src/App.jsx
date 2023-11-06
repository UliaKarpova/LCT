import { useState } from 'react'
import Button from "./components/ui/Button/Button.jsx";
import Input from "./components/ui/Input/Input.jsx";
import Map from "./components/Map/Map.jsx";
import {VKMap} from "./components/VKMap/VKMap.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app'>
      <Map center={[45.044942, 38.977131]}/>
    </main>
  )
}

export default App
