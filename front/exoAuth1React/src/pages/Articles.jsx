import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Articles(props) {
    const [articles, setArticles] = useState(null)
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/articles/')
      .then(res => setArticles(res.data.all_articles)).then(r => console.log(articles))
      .catch(error => console.log(error)
      )
    }, [])
    

  return (
    <>
      {
        articles ? articles.map((item, key) => (
            <>
            <span key={item.id}>{item.titre}</span>
            <span>{item.texte}</span>
            </>
        ))
        :
        <div>
            loading...
        </div>
      }
    </>
  )
}

export default Articles
