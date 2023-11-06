import { useState } from 'react'
import Auth from './components/Auth/Auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <main className='app'>
      {!isLoggedIn && <Auth />}
    </main>
  )
}

export default App
