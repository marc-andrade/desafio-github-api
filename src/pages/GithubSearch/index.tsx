import './styles.css';

import ResultCard from 'components/ResultCard';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  githubUser: string;
};

type Github = {
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  followers: string;
};

const GithubSearch = () => {
  const [github, setGithub] = useState<Github>();

  const [formData, setFormData] = useState<FormData>({
    githubUser: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${formData.githubUser}`)
      .then((response) => {
        setGithub(response.data);
      })
      .catch((error) => {
        setGithub(undefined);
        console.log(error);
      });
  };

  return (
    <div className="github-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="githubUser"
              className="search-input"
              placeholder="Usuário Github"
              value={formData.githubUser}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      {github && (
        <>
          <div className="result-search-container">
            <div className="result-image-container">
              <img src={github.avatar_url} alt="avatar Github" />
            </div>
            <div className="result-content-container">
              <h4>Informações</h4>
              <ResultCard title="Perfil" description={github.html_url} />
              <ResultCard title="Seguidores" description={github.followers} />
              <ResultCard title="Localidade" description={github.location} />
              <ResultCard title="Nome" description={github.name} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubSearch;
