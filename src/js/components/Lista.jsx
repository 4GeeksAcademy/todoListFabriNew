import React, { useEffect, useState } from "react";
import "./Lista.css";

const Lista = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // URL de la API
    const API_URL = 'https://playground.4geeks.com/todo/users/fabrigasman';


    const fetchTodos = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    setTodos([]);
                }
            })
            .catch(error => console.error('Error al obtener tareas:', error));
    };


    const updateTodos = (newTodos) => {
        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodos)
        })
        .then(response => response.json())
        .then(() => fetchTodos()) // Actualiza la lista después de modificarla
        .catch(error => console.error('Error al actualizar tareas:', error));
    };


    const createUser = () => {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([])
        })
        .then(response => response.json())
        .then(() => fetchTodos()) // Carga las tareas después de crear el usuario
        .catch(error => console.error('Error al crear usuario:', error));
    };


    const addTodo = () => {
        if (newTodo.trim() === '') return;

        const newTask = { id: Date.now(), text: newTodo };
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        updateTodos(updatedTodos); // Sincronizar con la API
        setNewTodo('');
    };


    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        updateTodos(updatedTodos); // Sincronizar con la API
    };

    const clearTodos = () => {
        setTodos([]);
        updateTodos([]); // Sincronizar con la API
    };


    useEffect(() => {
        createUser();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="card-title text-center">Lista de Compras 📜</div>
                    <input 
                        type="text" 
                        value={newTodo} 
                        onChange={(e) => setNewTodo(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <ul className="list-group">
                        {todos.map(todo => (
                            <li key={todo.id} className="list-group-item">
                                <span>{todo.text}</span>
                                <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">X</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearTodos} className="btn btn-warning mt-2">Limpiar Lista</button>
                </div>
                <div className="footer text-center">
                    <span>⬆ Agrega tus artículos</span>
                </div>
            </div>
        </>
    );
};

export default Lista;
