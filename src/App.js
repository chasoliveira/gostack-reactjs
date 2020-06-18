import React from "react";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    url: '',
    title: '',
    techs: []
  });

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', formData);
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((r) => r.id !== id));
  }

  const onChangeHanlder = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <section>
        <div >
          <div >
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={onChangeHanlder} />
          </div>
          <div >
            <label htmlFor="url">Repository Url</label>
            <input type="text" name="url" id="url" value={formData.url} onChange={onChangeHanlder} />
          </div>
          <div >
            <label htmlFor="techs">Techs</label>
            <input type="text" name="techs" id="techs" value={formData.techs} onChange={onChangeHanlder} />
          </div>
        </div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </section>
    </div>
  );
}

export default App;
