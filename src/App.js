import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";



function App() {
  const [ repositories, setRepositories ] = useState([]);

  
  useEffect(()=> {
      api.get('repositories').then((req) => {
      setRepositories([...req.data]);
      console.log(req);
  })}
  , []);

  async function handleAddRepository() {
    const repo = {
      title:`My new repo ${Date.now()}`,
      author:'Edson Moreira',
      techs:['Javascript', 'Node', 'React'],
    };
    api.post('repositories', repo).then((req)=> {
      setRepositories([...repositories, req.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((req)=>{
        const n_repos = [...repositories];
        const r_index = n_repos.findIndex((repo) => repo.id === id);
        if (r_index !== -1){
          n_repos.splice(r_index, 1);
          setRepositories(n_repos);
        }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {return (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
          )})}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
