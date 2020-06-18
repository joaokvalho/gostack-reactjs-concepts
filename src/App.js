import React, { useState, useEffect } from "react"

import api from './services/api'
import Footer from './core/Footer'
import Header from './core/Header'

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(results => {
      setRepositories(results.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
        title: "Desafio ReactJS",
        url: "https://github.com/joaokvalho/webpack-project-site",
        techs: [
          "HTML", "Node.js", "CSS", "Gulp"
        ],
        "likes": 0
    }

    const response = await api.post('repositories', repository)
    if (response.status === 200) {
      setRepositories([...repositories, repository])
    }else {
      alert(response.statusText)
    }    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    const status = response.status
    if (status === 204){
      const repos = repositories.filter(repo => repo.id !== id) 
      setRepositories(repos)
    }else {
      alert(`Error ${status}`)
    }
  }

  return (
    <div className="app">
      <Header userName="JOAO" />

      <div className="container">
      <button className="btn btn--purple" onClick={handleAddRepository}>Adicionar</button>
        <hr />
        <ul data-testid="repository-list">                    
          {repositories.map(repo => (
            <li key={repo.title}>
              {repo.title}
              <button className="btn btn--red" onClick={() => handleRemoveRepository(repo.id)}>
                Remover
               </button>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default App;
