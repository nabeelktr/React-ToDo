import React, { useEffect, useRef, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editID, setEditID] = useState(0)
  const inputEl = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== "" && !editID ) {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }
    if(editID){
        const updatedList = todos.map((list)=> list.id === editID.id
        ?(list = {id:list.id , list : todo})
        :(list = {id:list.id , list:list.list})
        )
        setTodos(updatedList)
        setEditID()
        setTodo('')
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    let tod = todos.map((todos) => {
      if (todos.id === id) {
        return { ...todos, status: !todos.status };
      } else {
        return todos;
      }
    });
    setTodos(tod);
  };
  const editTodo =(id)=>{
    const list = todos.find((list)=> list.id === id)
    setTodo(list.list)
    setEditID(list)
    
  }

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <div className="flex justify-center  p-4 bg-slate-950">
      <div className="w-full max-w-2xl p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-3 text-base font-semibold text-gray-900 md:text-2xl dark:text-white">
          📝 ToDo APP
        </h1>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          😋 Whoops.. it's{" "}
          <span className="text-lg font-bold t  dark:text-white">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}!
          </span>
        </p>

        {/* form------------- */}

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              id=""
              placeholder="Add a Task.."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={inputEl}
            />
            <button
              type="submit"
              onClick={addTodo}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editID? 'EDIT' : 'ADD'}
            </button>
          </div>
        </form>

        <ul className="my-4 space-y-3 p-6">




          {todos.map((todos) => (
            <div key={todos.id}>
              <li className={todos.status ? " opacity-50" : ""} >
                <p className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span
                    className="flex-2 svg-icon svg-icon-primary svg-icon-2x "
                    title="Complete?"
                    onClick={() => completeTodo(todos.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <circle
                          fill="#000000"
                          opacity="0.3"
                          cx="12"
                          cy="12"
                          r="10"
                          className=" hover:fill-slate-300 cursor-pointer  "
                        />
                        <path
                          d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z"
                          fill="#28a745"
                          className=" hover:fill-slate-300 cursor-pointer  "
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </span>
                  <span
                    className="flex-1 ml-3 whitespace-nowrap "
                    style={
                      todos.status
                        ? { textDecoration: "line-through", opacity: "0.3" }
                        : {}
                    }
                  >
                    {todos.list}
                  </span>

                  <span
                    className="svg-icon svg-icon-primary svg-icon-2x "
                    title="Edit"
                    onClick={()=> editTodo(todos.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z"
                          fill="#FF5733"
                          className=" hover:fill-slate-300 cursor-pointer  "
                          fillRule="nonzero"
                          transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409)"
                        />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          x="5"
                          y="20"
                          width="15"
                          height="2"
                          rx="1"
                        />
                      </g>
                    </svg>
                  </span>

                  <span
                    className="svg-icon svg-icon-primary svg-icon-2x "
                    title="Delete"
                    onClick={() => deleteTodo(todos.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z"
                          fill="#dc3545"
                          className="hover:fill-slate-300 cursor-pointer  "
                          fillRule="nonzero"
                        />

                        <path
                          d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                          fill="#dc3545"
                          className=" hover:fill-slate-300 cursor-pointer "
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </span>
                </p>
              </li>
            </div>
          ))}




        </ul>
        <div>
          <p
            href="#"
            className="inline-flex items-center text-xs font-normal text-gray-500  dark:text-gray-400 "
          >
            "Life is what happens when you're busy making other plans."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
