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

  const addTodo = async () => {
    if (!newTodoText) return

    const response = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      body: JSON.stringify({ text: newTodoText }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()
    console.log("data", data);
    setTodos([...todos, data])
    setNewTodoText('')
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/todo")
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        setLoading(false)
      }
      )
  }, []);


  return (
    <main className="grid lg:place-items-start place-items-center w-full bg-gray-800 text-purple-500 min-h-screen">
      <div className="flex lg:flex-row flex-col gap-5 lg:justify-start justify-center lg:items-start items-center w-full mx-auto">
        <div className="sm:w-9/12 lg:w-6/12 w-full lg:my-10 flex flex-col justify-center items-center">
          <h1 className="lg:text-5xl text-3xl py-8 lg:pt-14 uppercase font-medium text-purple-500 ">fatemeweb</h1>
          <h1 className="text-4xl py-8 lg:py-0 lg:pt-4 lg:pb-14 text-yellow-500" >Todo List</h1>

          {editTodo ?
            <>
              {/* edit */}
              <input type="text" className="w-full lg:w-8/12 bg-gray-800 border border-yellow-400 py-4 text-xl rounded-lg text-white outline-none px-3" />
              <button className="bg-slate-500 px-6 py-2 rounded-lg my-7 text-white text-lg uppercase font-semibold">save</button>
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
            </>}

        </div>

        <div className="">
          {loading ? }
        </div>
      </div>
    </main>
  )
}
