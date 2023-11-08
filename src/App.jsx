import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Auth from './components/Auth/Auth'
import WorkersList from './components/WorkersList/WorkersList'
import CreateUserPopup from "./components/CreateUserPopup/CreateUserPopup.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <main className='app'>
        <Routes>
          <Route path="*" element={<Auth />} />
          <Route path="manager" element={<WorkersList />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
