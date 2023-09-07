"use client"

import { useEffect, useState } from "react";


type Todo = {
  _id: string,
  text: string | null,
  completed: boolean
}

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");

  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetch("api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })

  }, []);

  const addTodo = async () => {
    if (!newTodoText) return

    const response = await fetch("api/todo", {
      method: "POST",
      body: JSON.stringify({ text: newTodoText }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()
    console.log("data", data);
    setTodos([...todos, data])
    setNewTodoText('')
  }


  const editHandler = (todo: Todo) => {
    setEditTodo(todo)
  }

  const saveHandler = async () => {
    if (!editTodo) return;
    const res = await fetch("api/todo", {
      method: "PUT",
      body: JSON.stringify({
        id: editTodo._id,
        text: editTodo.text,
        completed: editTodo.completed
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.status === 200) {
      setTodos(
        todos.map((todo: Todo) =>
          todo._id === editTodo._id ? { ...todo, text: editTodo.text } : todo
        ))
      setEditTodo(null)
    }
  }

  const toggleTodoHandler = async (id: string, completed: boolean) => {
    const res = await fetch("api/todo", {
      method: "PUT",
      body: JSON.stringify({ id, completed: !completed }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.status === 200) {
      setTodos(
        todos.map((todo: Todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      )
    }

  }

  const deleteHandler = async (id: string) => {
    const res = await fetch("api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.status === 200) {
      setTodos(todos.filter((todo: Todo) => todo._id !== id))
    }
  }

  return (
    <main className="grid lg:place-items-start place-items-center w-full bg-gray-800 text-purple-500 min-h-screen">
      <div className="flex lg:flex-row flex-col gap-5 lg:justify-start justify-center lg:items-start items-center w-full mx-auto">
        <div className="sm:w-9/12 lg:w-6/12 w-full lg:my-10 flex flex-col justify-center items-center">
          <h1 className="lg:text-5xl text-3xl py-8 lg:pt-14 uppercase font-medium text-purple-500 ">fatemeweb</h1>
          <h1 className="text-4xl py-8 lg:py-0 lg:pt-4 lg:pb-14 text-yellow-500" >Todo List</h1>

          {editTodo ?
            <>
              {/* edit */}
              <input
                type="text"
                className="w-full lg:w-8/12 bg-gray-800 border border-yellow-400 py-4 text-xl rounded-lg text-white outline-none px-3"
                value={editTodo.text!}
                onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
              />
              <button
                className="bg-slate-500 px-6 py-2 rounded-lg my-7 text-white text-lg uppercase font-semibold"
                onClick={saveHandler}
              >save</button>
            </>
            :
            <>
              {/* add todo */}
              <input
                type="text"
                className="w-full lg:w-8/12 bg-gray-800 border border-purple-500 py-4 text-xl rounded-lg text-white outline-none px-3"
                placeholder="write..."
                value={newTodoText}
                onChange={e => setNewTodoText(e.target.value)}
              />
              <button
                onClick={addTodo}
                className="bg-slate-500 px-6 py-2 rounded-lg my-7 text-white text-lg uppercase font-semibold">Add</button>
            </>
          }

        </div>

        <div className="sm:w-9/12 lg:w-5/12 w-full flex flex-col justify-center items-center my-6 py-6">
          {loading &&
            <p className="text-pink-600 text-2xl italic my10">loading</p>
          }

          {!loading && todos && todos.length === 0 ?
            <div className="text-pink-600 text-2xl italic my10">there is no todo in the list</div>
            :
            <>
              {!loading && todos && todos.map((todo: Todo) =>
                <li
                  key={todo._id}
                  className="bg-stale-800 px-6 py-5 rounded-lg text-gray-300 hover:text-white w-full text-lg flex justify-between"
                >
                  <div className="flex justify-start items-start w-8/12">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      checked={todo.completed}
                      onChange={() => toggleTodoHandler(todo._id, todo.completed)}
                    />
                    <span className={`px-4 w-full ${todo.completed ? "line-through" : "list-none"}`}>{todo.text}</span>
                  </div>

                  <div className="w-4/12 md:w-3/12 flex gap-x-4">
                    <button
                      className="text-sky-400 hover:text-sky-600 uppercase md:text-base text-sm px-3"
                      onClick={() => editHandler(todo)}
                    >edit</button>
                    <button
                      className="text-pink-400 hover:text-pink-600 uppercase md:text-base text-sm px-3"
                      onClick={() => deleteHandler(todo._id)}
                    >Delete</button>
                  </div>
                </li>)}
            </>
          }

        </div>
      </div>
    </main>
  )
}
