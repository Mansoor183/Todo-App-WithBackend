import React,{useState,useEffect} from 'react'
import './App.css'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import axios from 'axios'

const style= {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
   heading: `text-3xl font-bold text-center text-grey p-2`,
   form: `flex justift-between`,
   input:`border p-2 w-full text-xl`,
   button:`border p-4 ml-2 bg-purple-500 text=slate-100`,
   count:`text-center p-2`
}

function App() {
  const [todos,setTodos]=useState([])
  const [input,setInput]=useState('')
  const API_URL='http://localhost:8080/api/v1/todos';

  //Create Todo
  const createTodo= async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please Enter a Valid Todo');
      return;
    }
    const response = await axios.post(API_URL + '/post', {
      text: input,
      completed: false,
    });
    setTodos([...todos, response.data]);
    setInput('');
  }
  //Read Todo
  useEffect(()=>{
    const fetchTodos = async () => {
      const response = await axios.get(API_URL + '/get');
      setTodos(response.data);
    };
    fetchTodos();
  },[]);

  //Update Todo
  const toggleComplete= async (todo) => {
    const response = await axios.put(API_URL + `/${todo.id}/toggle`);
    const updatedTodos = todos.map((t) => (t.id === todo.id ? response.data : t));
    setTodos(updatedTodos);
  }
  //Delete Todo
  const deleteTodo = async (id) => {
    await axios.delete(API_URL + `/del/${id}`);
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  }
  // Update Todo Item
const updateTodo = async (updatedTodo) => {
  await axios.put(API_URL + `/update/${updatedTodo.id}`, updatedTodo);
    const updatedTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
    setTodos(updatedTodos);
};


  return (
    <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App</h3>
          <form onSubmit={createTodo} className={style.form}>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder='Add Todo'/>
            <button className={style.button}><AiOutlinePlus size={30} /></button>
          </form>
          <ul>
            {todos.map((todo, index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
            ))}
            
          </ul>

          {todos.length<1 ? null : <p className={style.count}>{`You Have ${todos.length} todos`}</p> }
      
        </div>
    </div>
  )
}

export default App
