import React from 'react';

// توابع onDelete و onToggleComplete را از App.js به عنوان props دریافت می‌کنیم
const TodoList = ({ tasks, onDelete, onToggleComplete }) => { 
  return (
    <div>
      <h3>Current Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet! Add one above.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              // ۱. افزودن استایل خط‌خورده (به صورت ناقص و بدون CSS)
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
            >
              {/* ۲. دکمه Toggle */}
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)} // فراخوانی تابع toggleComplete
              />
              
              {task.text} 

              {/* ۳. دکمه حذف */}
              <button 
                onClick={() => onDelete(task.id)} // فراخوانی تابع onDelete
                style={{ marginLeft: '10px' }} 
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TodoList;