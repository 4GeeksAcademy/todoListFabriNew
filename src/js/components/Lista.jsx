import React, { useState } from "react";
import "./Lista.css"
//create your first component
const Lista = () => {
    // const initialToDo = [{
    //  id: 1, text: ''
    // }, {
    //  id: 2, text: ''
    // }]
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const addTodo = () => {
        setTodos([...todos, { id: Date.now(), text: newTodo }])
        setNewTodo('')
    };
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="card-tittle text-center">Lista de Compras📜</div>
                    <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTodo()}/>
                    <ul className="list-group">
                        {
                            todos.map(todo=>(<li key={todo.id} className="list-group-item"><span>{todo.text}</span><button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">X</button></li>))
                        }
                    </ul>
                </div>
                <div className="footer text-center">
                    <span className="">⬆Agrega tus articulos</span>
                </div>
            </div>
        </>
    );
};
export default Lista;