import React, { useState, useEffect } from 'react'; // مطمئن شوید هر دو هوک وارد شده‌اند
import './App.css';
import TodoForm from './TodoForm'; 
import TodoList from './TodoList'; 

// ۱. تابع بازیابی داده‌ها (خارج از کامپوننت)
const getInitialTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    // اگر داده‌ای وجود دارد، آن را تبدیل به آرایه و برگردان. در غیر این صورت، آرایه خالی برگردان
    return savedTodos ? JSON.parse(savedTodos) : []; 
};

function App() {
    // ۲. تعریف State (داخل کامپوننت)
    const [todos, setTodos] = useState(getInitialTodos);

    // ۳. useEffect برای ذخیره‌سازی (داخل کامپوننت، زیر useState)
    useEffect(() => {
        // تبدیل آرایه به رشته (JSON) و ذخیره در Local Storage
        localStorage.setItem('todos', JSON.stringify(todos)); 
    }, [todos]); 

    // ۴. تعریف توابع مدیریت State (داخل کامپوننت، زیر useEffect)
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    
    return (
        <div className="App">
            <header className="App-header"></header>
            
            <h1>My Advanced Todo App (V0.4 - Persistence Added)</h1> 
            
            <TodoForm onAddTodo={addTodo} />
            
            <TodoList 
                tasks={todos} 
                onDelete={deleteTodo} 
                onToggleComplete={toggleComplete} 
            />
            
        </div>
    );
}

export default App;