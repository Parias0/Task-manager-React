import { useState, useEffect } from "react";
import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "new task added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const toggleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }; // Przełączamy wartość completed na przeciwną
        }
        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div>
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Enter a new task to do"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "submit"}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo
                items={list}
                removeItem={removeItem}
                editItem={editItem}
                toggleComplete={toggleComplete} // Dodajemy nową funkcję toggleComplete
              />
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
