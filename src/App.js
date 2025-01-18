import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "./features/todo/todoSlice";

function App() {
  const [input, setInput] = useState({
    data: "",
    isCompleted: false,
  });

  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos.todos);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.data.trim() == "") {
      alert("Invalid Input");
      return;
    }
    if (editId) {
      dispatch(editTodo({ ...input, id: editId }));
      setInput({ data: "", isCompleted: false });
      setEditId(null);
    } else {
      dispatch(addTodo(input));
      setInput({ data: "", isCompleted: false });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id) => {
    const t = todos.find((t) => t.id == id);
    setInput({ data: t.todo, isCompleted: t.isCompleted });
    setEditId(id);
  };

  const handleInput = (e) => {
    let inputData = "";
    if (e.target.value != "") {
      inputData = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    }
    setInput({
      ...input,
      data: inputData,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center md:items-start p-3 justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Taskify</h1>
          <div className="mb-4">
            <form
              action=""
              onSubmit={(e) => handleSubmit(e)}
              className="flex relative"
            >
              <input
                ref={inputRef}
                type="text"
                name="todo"
                value={input.data}
                placeholder="Enter Todo"
                onChange={(e) => handleInput(e)}
                className="w-full p-2 border-2  border-blue-300 rounded-full flex justify-center items-center"
                autoComplete="off"
                required
              />
              <button
                type="submit"
                className="absolute  rounded-full bg-blue-500 text-white px-4 py-1 top-1/2 right-[.4rem] transform -translate-y-1/2 flex items-center gap-1 flex-nowrap hover:bg-blue-600 font-semibold"
              >
                {editId ? (
                  <>
                    <AiOutlineEdit className="font-extrabold" />
                    <span>EditTodo</span>
                  </>
                ) : (
                  <>
                    <AiOutlinePlus className="font-extrabold" />
                    <span>AddTodo</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <ul
            className="list-none p-0 h-[60vh] flex flex-col p-2 max-h-[400px] overflow-y-auto 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {todos &&
              [...todos].reverse().map((t) => (
                <li
                  key={t.id}
                  className={`w-full flex items-center justify-between px-2 py-1 ${
                    t.isCompleted ? "opacity-50 bg-slate-100" : ""
                  }`}
                >
                  <div className={`w-3/4 content flex gap-5 text-md`}>
                    <input
                      type="checkbox"
                      name="isCompleted"
                      id="done"
                      defaultChecked={input.isCompleted}
                      onClick={() => handleToggle(t.id)}
                      className="transform scale-150"
                    />
                    <div
                      className={`break-all whitespace-normal ${
                        t.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {t.todo}
                    </div>
                  </div>
                  <div className="control flex gap-3">
                    <button
                      className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                      onClick={() => handleEdit(t.id)}
                    >
                      <AiOutlineEdit
                        style={{ fontWeight: "bolder", fontSize: "1.2rem" }}
                      />
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(t.id)}
                    >
                      <AiOutlineDelete
                        style={{ fontWeight: "bolder", fontSize: "1.2rem" }}
                      />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
