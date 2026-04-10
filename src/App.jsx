//import
import styles from "./App.module.css"; //style by module.css
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//todo list component
export default function Todo_List() {
  const [todos, setTodos] = useState([]);
  //fech function
  useEffect(function () {
    async function fetchTodos() {
      try {
        const response = await axios.get("https://dummyjson.com/todos");
        setTodos(response.data.todos);
      } catch (error) {
        console.log(error);
      }
    }
    //mount
    fetchTodos();
  }, []);
  //useref for input form
  const inputRef = useRef();
  //new todo function//post function
  async function newTodo(ev) {
    ev.preventDefault();
    let newTodo = {
      todo: inputRef.current.value,
      completed: false,
      userId: 7,
    };
    try {
      const response = await axios.post(
        "https://dummyjson.com/todos/add",
        newTodo,
      );
      //spread operator
      // todos.push(response.data);
      // setTodos([...todos]);
      //a nother
      setTodos([...todos, response.data]);
      ev.target.reset();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  //delete function
  async function deleteTodo(id, index) {
    try {
      const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
      // todos.splice(index, 1);
      // setTodos([...todos]);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  //update function
  async function update(ev, id, index) {
    const data = {
      completed: ev.target.checked,
    };
    try {
      const response = await axios.patch(
        `https://dummyjson.com/todos/${id}`,
        data,
      );
      //  setTodos([...todos]);

      todos[index].completed = response.data.completed;
      ev.target.checked = todos[index].completed ? true : false;
      console.log(ev.target.checked);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  return (
    <>
      <div id={styles.list}>
        <h1>My ToDo List</h1>
        <form onSubmit={newTodo}>
          <input
            type="text"
            placeholder="   enter your new todo....."
            ref={inputRef}
          />
          <button type="submite">add</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div>
                {/* <h3>{todo.completed ? "✔" : "❌"}</h3> */}
                <input
                  type="checkbox"
                  // it is  different way to right checked
                  checked={todo.completed ? true : false}
                  onChange={(ev) => update(ev, todo.id, index)}
                />
                <h3>{todo.todo}</h3>
              </div>
              {/* it runs every render not through calling(click)  */}
              {/* <button onClick={deleteTodo(todo.id, index)}>delete</button>    */}
              {/* it runs only at click  */}
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
