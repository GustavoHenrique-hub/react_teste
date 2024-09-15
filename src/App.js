import { useState } from "react";
import "./App.css";

function App() {
  //Find all values
  const [stateProdId, setStateProdId] = useState("");
  const [stateProdName, setStateProdName] = useState("");
  const [stateProdQuant, setStateProdQuant] = useState("");
  const [stateProdPrice, setStateProdPrice] = useState("")

  const [stateProdNameById, setStateProdNameById] = useState("");

  const [stateNewName, setStateNewName] = useState("");

  const [stateResultadoApi, setStateResultadoApi] = useState("");

  const [stateDeleteProdId, setStateDeleteProdId] = useState("")

  const handleFindAll = async () => {
    const urlFindAll = `https://test-docker-repository.onrender.com/product/findAll`;

    try {
      fetch(urlFindAll)
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const handleFindById = (e) => {
    const urlFindById = `https://test-docker-repository.onrender.com/product/findById/${stateProdId}`;

    e.preventDefault();
    try {
      fetch(urlFindById)
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((data) => {
          console.log(data);
          setStateProdNameById(data.nome);
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const handleInsertProd = (e) => {
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
          nome: stateProdName,
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

  const handleUpdateProd = (e) => {
    const alterById = `http://localhost:8080/medico/altera/${stateProdId}`;

    e.preventDefault();
    try {
      fetch(alterById, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: stateNewName,
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
  };

  const handleDeleteProd = (e) => {
    const deleteById = `http://localhost:8080/medico/delete/${stateProdId}`;

    e.preventDefault();
    try {
      fetch(deleteById, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
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
  };

  return (
    <div className="App">
      <br />
      <h1>Listar</h1>
      <button onClick={handleFindAll}>Listar</button>
      <br />
      <div className="formulario">
        {/* Insert */}
        <h3>Insert</h3>
        <form onSubmit={handleInsertProd} method="POST">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            onChange={(e) => setStateProdName(e.target.value)}
          />
          <br />

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
            <span>{stateProdName}</span>

            <br />

            <span>{`AINDA NÃO HÁ NADA`}</span>
          </div>
        </form>
        
        {/* Find by Id */}
        <h3>Find by id</h3>
        <form onSubmit={handleFindById} method="GET">
          <label htmlFor="nome">Id</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu Id"
            onChange={(e) => setStateProdId(e.target.value)}
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

            <span>{stateProdNameById}</span>

            <br />

            <span>{`AINDA NÃO HÁ NADA`}</span>
          </div>
        </form>
        
        {/* Update */}
        <h3>Update</h3>
        <form onSubmit={handleUpdateProd} method="PUT">

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder={stateProdNameById}
            onChange={(e) => setStateNewName(e.target.value)}
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

            <span>{`AINDA NÃO HÁ NADA`}</span>
          </div>
        </form>
        
        {/* Delete */}
        <h3>Delete</h3>
        <form onSubmit={handleDeleteProd} method="DELETE">
          <label htmlFor="ID">Id</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o id a ser deletado"
            onChange={(e) => {
              setStateDeleteProdId(e.target.value);
            }}
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
