import { useState } from "react";
import "./App.css";

function App() {
  const [stateName, setStateName] = useState("");
  const [stateCRM, setStateCRM] = useState("");
  const [stateId, setStateId] = useState("");

  const callSearchById = (e) => {
    const buscaPorId = `http://localhost:8080/medico/busca/${stateId}`;

    e.preventDefault();
    try {
      fetch(buscaPorId)
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((dadoUsuario) => {
          console.log(dadoUsuario);
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const takeData = async () => {
    const listarMedicos = `http://localhost:8080/medico/listar`;

    try {
      fetch(listarMedicos)
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((dadoLista) => {
          console.log(dadoLista);
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };
  const callMedApi = (e) => {
    const insertPost = `http://localhost:8080/medico/inserir`;

    e.preventDefault();

    try {
      fetch(insertPost, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: stateName,
          crm: stateCRM,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((dadoAPI) => {
          console.log(dadoAPI);
        });
    } catch (err) {
      console.log("ERROR FETCHING DATA: ", err);
    }
  };
  return (
    <div className="App">
      <br/>
      <button onClick={takeData}>Listar</button>
      <br />
      <div className="formulario">
        <form onSubmit={callMedApi} method="POST">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            onChange={(e) => setStateName(e.target.value)}
          />
          <br />
          <label htmlFor="CRM">CRM</label>
          <input
            type="text"
            name="CRM"
            placeholder="Digite seu CRM"
            onChange={(e) => setStateCRM(e.target.value)}
          />

          <input type="submit" value="Gravar" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <br />
            <span>{stateName}</span>

            <br />

            <span>{stateCRM}</span>
          </div>
        </form>

        <form onSubmit={callSearchById}>
          <label htmlFor="nome">Id</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            onChange={(e) => setStateId(e.target.value)}
          />

          <input type="submit" value="Gravar" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <br />
            <span>{stateName}</span>

            <br />

            <span>{stateCRM}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
