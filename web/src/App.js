import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './SideBar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Compponente: Bloco isolado de HTML, CSS e/ou JS, o qual não interfere no restante da aplicação
//              Normamente é preferivel que cada componente esteja em um arquivo separado
// Propriedade: Informações que o componente PAI passa para o componente FILHO
// Estado: Informações Mantidas pelo componente (lembrar: imutabilidade)

function App() {
  const [ devs, setDevs ] = useState([]);

  useEffect( () => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
