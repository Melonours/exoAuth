import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
        const token = localStorage.getItem('access_token')
        axios.get('http://127.0.0.1:8000/api/get_user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data.user)
                console.log(res.data);
            })
    } catch (error) {
        console.log(error);
    }
}, [])

  const logout = () => {
    localStorage.removeItem('access_token')
    axios.post('http://127.0.0.1:8000/api/logout/')
        .then(res => props.setMessage(res.data.message))
        .catch(err => console.log(err))
    setUser(null)
}

  return (
    <>
     <div>
          <h1>Homepage</h1>
          {user ? <div>
              <button onClick={logout} >Logout</button>
              <h1>{user.prenom}</h1>
              <p>{user.id}</p>
              <a href="/articles/create"><button>Create article</button></a>
              <a href="/articles"><button>See All Articles</button></a>
          </div> : <div>
              <a href="/register"><button>Inscription</button></a>
              <a href="/connexion"><button>Connexion</button></a>
              <a href="/articles"><button>See All Articles</button></a>
          </div>}
      </div>
    </>
  )
}

export default Home
