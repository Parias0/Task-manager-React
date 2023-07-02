import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

function ToDo({ items, removeItem, editItem, toggleComplete }) {
  return (
    <div className="todo-task">
      {items.map((item) => {
        const { id, title, completed } = item;
        return (
          <article key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
            <p className={`title ${completed ? 'completed' : ''}`}>{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="completed-btn"
                onClick={() => toggleComplete(id)}
              >
                <FaCheck className="icons" />
              </button>
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit className="icons"/>
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash className="icons" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ToDo;
