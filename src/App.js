import { useState } from 'react';
import './App.css';

function App() {
  const [stateName, setStateName] = useState("");
  const [stateCRM, setStateCRM] = useState("")


  const takeData = async () => {
    const listarMedicos = `http://localhost:8080/medico/listar`

    fetch(listarMedicos, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      }, 
    }).then((response) => {
      response.json()
    }).then((dadoLista)=> {

        for(let i = 0; i < 4; i++){
        console.log(dadoLista[i])
        }
      
    }).catch((err) => {
      console.log("ERRO: ", err)
    })
  }
  const callMedApi = () => {
    const insertPost = `http://localhost:8080/medico/inserir/`
    
    fetch(insertPost, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      }, 
      body: JSON.stringify({
        nome: stateName,
        crm: stateCRM,  
      })
    }).then((response) => {
      response.json()
    }).then((dadoAPI) => {
      console.log(dadoAPI)
    }).catch((error) => console.log("ERROR FETCHING DATA: ", error))
  }

  return (
    <div className="App">

      <button onClick={takeData}> Gravar</button>

      {/* <div className='formulario'>
        <form onSubmit={takeData}>

          <label htmlFor="nome">Nome</label>
          <input type='text' name='nome' placeholder='Digite seu nome' ></input>

          <label htmlFor="CRM">CRM</label>
          <input type='text' name='CRM' placeholder='Digite seu CRM'></input>

          <input type='submit' value="Gravar" />
        </form>
      </div> */}
    </div>
  );
}

export default App;
