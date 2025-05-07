import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Connexion(props) {
    const [formData, setFormData] = useState({
        'email' : '',
        'password' : '',
    })

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://127.0.0.1:8000/api/login/', formData)
        const accessToken = response.data.access_token
        localStorage.setItem('access_token', accessToken)
        if (response.data.status === 'success') {
            props.setMessage(response.data.message)
            navigate('/')
        } else {
            props.setMessage(response.data.message)
        }
    }

    const change = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value})
    }

  return (
    <div>
        {props.message.length > 0 ? <p>{props.message}</p> : null}
        <form onSubmit={login}>
            <label htmlFor="">Email</label>
            <input type="text" name='email' value={formData.email} onChange={(e) => change(e)} />
            <label htmlFor="">Password</label>
            <input type="password" name='password' value={formData.password} onChange={(e) => change(e)} />
            <button type="submit">Connexion</button>
        </form>
    </div>
  )
}

export default Connexion
