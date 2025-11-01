// TodoFilter.js
import React from 'react';

// ۱. ما 'filter' فعلی و تابع 'setFilter' را از App.js به عنوان props دریافت می‌کنیم
const TodoFilter = ({ currentFilter, onFilterChange }) => { 
  
  // این تابع را به دکمه‌ها متصل می‌کنیم
  const handleFilterClick = (newFilter) => {
    onFilterChange(newFilter); // فراخوانی setFilter از App.js
  };

  return (
    <div style={{ margin: '15px 0' }}>
      {/* ۲. دکمه‌ها برای تغییر فیلتر */}
      <button 
        onClick={() => handleFilterClick('all')}
        // ۳. اگر فیلتر فعلی 'all' باشد، آن را بولد می‌کنیم (استایل ناقص)
        style={{ fontWeight: currentFilter === 'all' ? 'bold' : 'normal', marginRight: '10px' }}
      >
        All
      </button>
      
      <button 
        onClick={() => handleFilterClick('completed')}
        style={{ fontWeight: currentFilter === 'completed' ? 'bold' : 'normal', marginRight: '10px' }}
      >
        Completed
      </button>
      
      <button 
        onClick={() => handleFilterClick('uncompleted')}
        style={{ fontWeight: currentFilter === 'uncompleted' ? 'bold' : 'normal' }}
      >
        Active
      </button>
    </div>
  );
};

export default TodoFilter;