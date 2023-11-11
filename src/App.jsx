import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Auth from './Pages/Auth/Auth';
import Manager from './Pages/ManagerProfile/Manager';
import WorkerProfile from "./Pages/WorkerProfile/WorkerProfile.jsx";
import {AppContext} from "./context/index.js";
import {getCookie} from "./utils/helpers.js";
import api from "./utils/api.js";
import ClipLoader from "react-spinners/ClipLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [dailyTasks, setDailyTasks] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie('userId');
    const setLoginUser = async () => {
      if (userId) {
        try {
          if (userId === 'admin') {
            setUser({
              "role": "admin",
              "username": "admin"
            })
          } else {
            setIsLoading(true)
            const res = await api.getUser(userId);
            const loginUser = await res.json();
            await setUser(loginUser)
          }
        } catch (err) {
          console.log(`Произошла ошибка: ${err}`)
        } finally {
          setIsLoading(false)
        }
      }
    }
    setLoginUser()

  }, []);


  return (
      <AppContext.Provider value={{user, setUser, dailyTasks, setDailyTasks}}>
        <BrowserRouter>
          { !isLoading
              ?  <main className='app'>
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route element={<ProtectedRoute role='manager'/>}>
                  <Route path="manager/workers" element={<Manager />} />
                  <Route path="manager/departments" element={<Manager />} />
                  <Route path="manager/monitoring" element={<Manager />} />
                </Route>
                <Route element={<ProtectedRoute role='worker'/>}>
                  <Route path="worker" element={<WorkerProfile />} />
                </Route>
              </Routes>
            </main>
              :  <ClipLoader
                  color='#FF4B5F'
                  loading={isLoading}
                  size={300}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              />

          }
        </BrowserRouter>
      </AppContext.Provider>
  )
}

export default App
