import { useState } from "react";
import "./App.css";

function App() {
  
  //Find all values
  const [stateProdNewName, setStateProdNewName] = useState("");
  const [stateProdNewQuant, setStateProdNewQuant] = useState("");
  const [stateProdNewPrice, setStateProdNewPrice] = useState("");
  
  //Find value by ID
  const [stateFindProdId, setStateFindProdId] = useState("");
  const [stateProdNameById, setStateProdNameById] = useState("");
  const [stateProdQuantById, setStateProdQuantById] = useState("");
  const [stateProdPriceById, setStateProdPriceById] = useState("");

  //Update value by ID
  const [stateUpdateProdId, setStateUpdateProdId] = useState("");
  const [stateProdUpdateName, setStateProdUpdateName] = useState("");
  const [stateProdUpdateQuant, setStateProdUpdateQuant] = useState("");
  const [stateProdUpdatePrice, setStateProdUpdatePrice] = useState("");

  //Delete value by ID
  const [stateDeleteProdId, setStateDeleteProdId] = useState("");

  //API Response
  const [stateApiResponse, setStateApiResponse] = useState("");

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
    const urlFindById = `https://test-docker-repository.onrender.com/product/findById/${stateFindProdId}`;

    e.preventDefault();
    try {
      fetch(urlFindById)
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((data) => {
          console.log(data);
          setStateUpdateProdId(data.id)
          setStateProdNameById(data.name);
          setStateProdQuantById(data.quantity);
          setStateProdPriceById(data.price);
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const handleInsertProd = (e) => {
    const insertPost = `https://test-docker-repository.onrender.com/product/insert`;

    e.preventDefault();

    try {
      fetch(insertPost, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: stateProdNewName,
          quantity: stateProdNewQuant,
          price: stateProdNewPrice
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert(data.message)
        });
    } catch (err) {
      console.log("ERROR FETCHING DATA: ", err);
    }
  };

  const handleUpdateProd = (e) => {
    const alterById = `https://test-docker-repository.onrender.com/product/update/${stateUpdateProdId}`;

    e.preventDefault();
    try {
      fetch(alterById, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: stateProdUpdateName,
          quantity: stateProdUpdateQuant,
          price: stateProdUpdatePrice
        }),
      })
        .then((response) => {
          console.log("Response received:", response);

          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          alert(data.message)
        });
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const handleDeleteProd = (e) => {
    const deleteById = `https://test-docker-repository.onrender.com/product/delete/${stateDeleteProdId}`;

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
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert(data.message);
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
      <button onClick={handleFindAll}>List</button>
      <br />
      <div className="formulario">
        {/* Insert */}
        <h3>Insert</h3>
        <form onSubmit={handleInsertProd} method="POST">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type product name"
            onChange={(e) => setStateProdNewName(e.target.value)}
          />
          <br />
          <label htmlFor="quant">Quantity</label>
          <input
            type="number"
            name="quant"
            placeholder="Type product quantity"
            onChange={(e) => setStateProdNewQuant(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="quant"
            placeholder="Type product price"
            onChange={(e) => setStateProdNewPrice(e.target.value)}
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
            <span>{stateProdNewName}</span>
            <br />
            <span>{stateProdNewQuant}</span>
            <br />
            <span>{stateProdNewPrice}</span>
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
            onChange={(e) => setStateFindProdId(e.target.value)}
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
            <span>{stateProdQuantById}</span>

            <br />
            <span>{stateProdPriceById}</span>

            <br />
          </div>
        </form>
        
        {/* Update */}
        <h3>Update</h3>
        <form onSubmit={handleUpdateProd} method="PUT">

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder={stateProdNameById}
            onChange={(e) => setStateProdUpdateName(e.target.value)}
          />
          <br />
          <label htmlFor="quant">Quantity</label>
          <input
            type="number"
            name="quant"
            placeholder={stateProdQuantById}
            onChange={(e) => setStateProdUpdateQuant(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder={stateProdPriceById}
            onChange={(e) => setStateProdUpdatePrice(e.target.value)}
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

            <span>{stateProdUpdateName}</span>

            <br />
            <span>{stateProdUpdateQuant}</span>

            <br />
            <span>{stateProdUpdatePrice}</span>

            <br />
          </div>
        </form>
        
        {/* Delete */}
        <h3>Delete</h3>
        <form onSubmit={handleDeleteProd} method="DELETE">
          <label htmlFor="ID">Id</label>
          <input
            type="text"
            name="nome"
            placeholder="Type the id to be deleted"
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

            <span>{stateApiResponse}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
