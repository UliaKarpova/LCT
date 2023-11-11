import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Auth from './Pages/Auth/Auth'
import WorkersList from './components/WorkersList/WorkersList'
import WorkerProfile from "./Pages/WorkerProfile/WorkerProfile.jsx";
import {AppContext} from "./context/index.js";

function App() {
  const [user, setUser] = useState(null);
  const [dailyTasks, setDailyTasks] = useState(null)

  return (
      <AppContext.Provider value={{user, setUser, dailyTasks, setDailyTasks}}>
        <BrowserRouter>
          <main className='app'>
            <Routes>
              <Route path="*" element={<Auth />} />
              <Route path="manager" element={<WorkersList />} />
              <Route path="worker" element={<WorkerProfile />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AppContext.Provider>
  )
}

export default App
