import React from 'react'
import '../index.css';

const SettingPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='p-5'>
      <aside>
        <div
          className="border-2 cursor-pointer border-sky-600 w-44 p-2 flex flex-col items-center text-sky-600 font-bold"
          onDragStart={(event) => onDragStart(event, 'default')}
          draggable>
          <svg className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />  <line x1="8" y1="9" x2="16" y2="9" />  <line x1="8" y1="13" x2="14" y2="13" /></svg>
          <p>Message</p>
        </div>
      </aside>
    </div>
  );
}

export default SettingPanel