import { useState } from 'react'
import Auth from './components/Auth/Auth'
import WorkersList from './components/WorkersList/WorkersList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <main className='app'>
      {/* {!isLoggedIn && <Auth />} */}
      <WorkersList />
    </main>
  )
}

export default App
