import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ArticleCreateForm() {
    const [articleForm, setArticleForm] = useState({
        titre : '',
        texte : '',
        date : '',
        user_id : ''
    })

    const navigate = useNavigate()
    const [token, setToken] = useState('')

    useEffect(() => {
        const tokenLocal = localStorage.getItem('access_token')
        if(tokenLocal == null || tokenLocal == ''){
            navigate('/connexion')
        } else {
            setToken(tokenLocal)
            console.log(tokenLocal)
        }
    }, [])
    

    const createArticle = async()=>{
        try {
            await axios.post('http://127.0.0.1:8000/api/articles/create/', articleForm, {headers : {
                Authorization : `Bearer ${token}`
            }} )
            
        } catch (error) {
            console.log(error)
        }
        }
    
    const change=(e)=>{
        const {name, value} = e.target
                setArticleForm({...articleForm, [name]: value})
            }

  return (
    <>
        <form action="">
            <label htmlFor="nom">Titre</label>
            <input type="text" name='titre' value={articleForm.titre} onChange={(e)=>change(e)} />
            <label htmlFor="texte">Texte</label>
            <input type="text" name='texte' value={articleForm.texte} onChange={(e)=>change(e)} />
            <button onClick={()=>{createArticle()}}>Créer</button>
        </form>
    </>
  )
}

export default ArticleCreateForm
