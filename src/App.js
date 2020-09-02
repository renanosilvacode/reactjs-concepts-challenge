import React, { useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {

        url: "https://github.com/Rocketseat/umbriel",
        title: `Umbriel ${Date.now()}`,
        techs: ["Node", "Express", "TypeScript"]
    })

    const repo = response.data;

    setRepositories([...repositories, repo]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if(response.status === 204){
      const newRepo = repositories.filter(repo => repo.id !== id);
      setRepositories(newRepo);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
