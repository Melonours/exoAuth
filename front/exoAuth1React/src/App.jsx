import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './components/Register'
import Connexion from './components/Connexion'
import Articles from './pages/Articles'
import ArticleCreateForm from './components/forms/ArticleCreateForm'

function App() {
  const [message, setMessage] = useState('')

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register message={message} setMessage={setMessage}/>} />
        <Route path='/connexion' element={<Connexion message={message} setMessage={setMessage}/>} />
        <Route path='/articles' element={<Articles message={message} setMessage={setMessage}/>} />
        <Route path='/articles/create' element={<ArticleCreateForm message={message} setMessage={setMessage}/>} />
      </Routes>
    </>
  )
}

export default App
