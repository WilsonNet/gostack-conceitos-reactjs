import React from 'react';

import './styles.css';
import api from './services/api';
import { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get('repositories')
      .then((response) => {
        const responseData = response.data;
        setRepositories(responseData);
      })
      .catch((error) => console.error(error));
  }, []);
  async function handleAddRepository() {
    const data = {
      url: `http://github.com/${Date.now()}`,
      title: `Wilson ${Date.now()}`,
      techs: ['javascript', 'react'],
    };

    api
      .post('repositories', data)
      .then((response) => {
        const responseData = response.data;
        setRepositories([...repositories, responseData]);
      })
      .catch((error) => console.error(error));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then((response) => {
        const newRepositories = repositories.filter(
          (repository) => id !== repository.id
        );
       setRepositories(newRepositories);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <input type="text" id="" />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
