import React, { useEffect, useState } from "react";
import "./App.css";
import AddElement from "./components/AddElement";
import axios from "axios";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [todoList, setTodoList] = useState({});
  const uri = "http://localhost:4000/";

  useEffect(() => {
    axios
      .get(uri)
      .then((data) => {
        // console.log(data.data);
        setTodoList(data.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (id) => {
    // console.log("id" + id);
    const DeleteId = new Promise((resolve, reject) => {
      let delId = uri + id;
      // console.log("delId" + delId);
      delId ? resolve(delId) : reject("error in deleteItem");
    });
    DeleteId.then((id) => axios.delete(id))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const loadMap = () => {
    if (loaded) {
      let todoListHTMLArr = [];
      for (let key in todoList) {
        // console.log(todoList[key].item);
        todoListHTMLArr.push(
          <>
            <p>
              {todoList[key].item}
              <button onClick={() => deleteItem(todoList[key]._id)}>
                {" X "}
              </button>
            </p>
          </>
        );
      }
      return todoListHTMLArr;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <AddElement url={uri} />
        {loadMap()}
      </header>
    </div>
  );
}

export default App;
