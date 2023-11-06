import { useState } from 'react'
import Button from "./components/ui/Button/Button.jsx";
import Input from "./components/ui/Input/Input.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app'>
      <h1>Регистрация</h1>
      <Button>Войти</Button>
        <Input placeholder='Логин'/>
        <Input placeholder='Пароль' forPassword/>
    </main>
  )
}

export default App
