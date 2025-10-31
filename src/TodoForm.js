import React, { useState } from 'react'; // ۱. وارد کردن useState برای مدیریت ورودی

// تابع onAddTodo را از App.js به عنوان props دریافت می‌کنیم
const TodoForm = ({ onAddTodo }) => {
  // ۲. State برای نگهداری متن وارد شده در Input
  const [inputText, setInputText] = useState('');

  // ۳. تابع مدیریت ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    if (inputText.trim() === '') return; // چک کردن برای ورودی خالی
    
    onAddTodo(inputText); // فراخوانی تابع از App.js
    setInputText(''); // پاک کردن ورودی بعد از افزودن
  };

  return (
    <form onSubmit={handleSubmit}> {/* ۴. اتصال تابع به رویداد ارسال فرم */}
      <h3>Add New Task (Input Form)</h3>
      <input 
        type="text" 
        placeholder="What needs to be done?" 
        value={inputText} // ۵. اتصال مقدار Input به State
        onChange={(e) => setInputText(e.target.value)} // ۶. به‌روزرسانی State هنگام تغییر
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default TodoForm;