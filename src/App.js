import TodoFilter from './TodoFilter'; // Import the new Filter component
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
    const [filter, setFilter] = useState('all');

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
    const getFilteredTodos = () => {
    if (filter === 'all') {
        // ۱. اگر فیلتر روی 'all' است، آرایه کامل وظایف را برمی‌گردانیم.
        return todos; 
    }
    
    if (filter === 'completed') {
        // ۲. فقط وظایفی را برمی‌گردانیم که completed: true باشند.
        return todos.filter(todo => todo.completed === true) 
    }

    if (filter === 'uncompleted') {
        // ۳. فقط وظایفی را برمی‌گردانیم که completed: false باشند.
        // (یا به صورت کوتاه: !todo.completed)
        return todos.filter(todo => todo.completed === false)
    }
    
    // در صورتی که فیلتر نامشخص بود، تمام لیست را برمی‌گرداند.
    return todos; 
};
    
    return (
        <div className="App">
            <header className="App-header"></header>
            
            <h1>My Advanced Todo App (V0.4 - Persistence Added)</h1> 
            
            <TodoForm onAddTodo={addTodo} />
            {/* به جای tasks={todos}، اکنون tasks={getFilteredTodos()} را می‌فرستیم */}
            {/* ۱. اضافه کردن کامپوننت فیلتر */}
            <TodoFilter 
            currentFilter={filter} // وضعیت فیلتر فعلی را می‌فرستیم
            onFilterChange={setFilter} // تابع تغییر دهنده (setFilter) را می‌فرستیم
        />
            <TodoList 
                tasks={getFilteredTodos()} // این آرایه فیلترشده را می‌فرستد
                onDelete={deleteTodo} 
                onToggleComplete={toggleComplete} 
        />
            
        </div>
    );
}

export default App;