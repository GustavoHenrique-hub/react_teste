import { useState } from "react";
import "./App.css";

function App() {
  const [stateName, setStateName] = useState("");
  const [stateCRM, setStateCRM] = useState("");
  const [stateId, setStateId] = useState("");

  const [stateNameById, setStateNameById] = useState("");
  const [stateCrmById, setStateCrmById] = useState("");

  const [stateNewId, setStateNewId] = useState("");
  const [stateNewName, setStateNewName] = useState("");
  const [stateNewCrm, setStateNewCrm] = useState("");

  const [stateResultadoApi, setStateResultadoApi] = useState("");

  const callAlterUser = (e) => {
    const alterById = `http://localhost:8080/medico/altera/${stateId}`;

    e.preventDefault();
    try {
      fetch(alterById, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: stateNewName,
          crm: stateNewCrm,
        }),
      })
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
  }

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
          setStateNewId(dadoUsuario.id)
          setStateNameById(dadoUsuario.nome);
          setStateCrmById(dadoUsuario.crm);
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

  const callDeleteUser = (e) => {
    const deleteById = `http://localhost:8080/medico/delete/${stateId}`;

    e.preventDefault();
    try {
      fetch(deleteById, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response.json(); // Continua como JSON
      })
      .then((dadoUsuario) => {
        console.log(dadoUsuario);
        setStateResultadoApi(dadoUsuario.message); // Lida com a resposta JSON
      })
      .catch((err) => {
        console.error("Erro ao fazer a requisição:", err);
      });
    } catch (err) {
      console.error("ERRO:", err);
    }
  }

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
            placeholder="Digite seu Id"
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
            
            <span>{stateNameById}</span>

            <br />

            <span>{stateCrmById}</span>
          </div>
        </form>


        <form onSubmit={callAlterUser} method="PUT">
          <label htmlFor="ID">Id</label>
          <input
            type="text"
            name="nome"
            value={stateNewId}
            onChange={ 
              (e) => {
                setStateId(e.target.value)
                }
            }
            
          />

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder={stateNameById}
            onChange={(e) => setStateNewName(e.target.value)}
          />

          <label htmlFor="CRM">CRM</label>
          <input
            type="text"
            name="CRM"
            placeholder={stateCrmById}
            onChange={(e) => setStateNewCrm(e.target.value)}
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
            
            <span>{stateNewName}</span>

            <br />

            <span>{stateNewCrm}</span>
          </div>
        </form>

        <form onSubmit={callDeleteUser} method="DELETE">
          <label htmlFor="ID">Id</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o id a ser deletado"
            onChange={ 
              (e) => {
                setStateId(e.target.value)
                }
            }
            
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
            
            <span>{stateResultadoApi}</span>

          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
