import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register(props) {
    const [formData, setFormData] = useState({
        nom : '',
        prenom : '',
        email : '',
        password : '',
    })

    const navigate = useNavigate()

    const inscription = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://127.0.0.1:8000/api/register/", formData)
        console.log(response.data);
        if (response.data.status === 'success'){
            props.setMessage(response.data.message)
            navigate('/')
        }else{
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
        <form onSubmit={inscription}>
            <label htmlFor="">Nom</label>
            <input type="text" name='nom' value={formData.nom} onChange={(e) => change(e)} />
            <label htmlFor="">Prenom</label>
            <input type="text" name='prenom' value={formData.prenom} onChange={(e) => change(e)} />
            <label htmlFor="">Email</label>
            <input type="text" name='email' value={formData.email} onChange={(e) => change(e)} />
            <label htmlFor="">Password</label>
            <input type="password" name='password' value={formData.password} onChange={(e) => change(e)} />
            <button type="submit">Inscription</button>
        </form>
    </div>
  )
}

export default Register
