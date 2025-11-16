import React from 'react';

const categories = ['All Notes', 'Work', 'Personal', 'Ideas'];

export default function Sidebar({ selected, setSelected }) {
  return (
    <aside className='sidebar'>
      <h2>Categories</h2>
      <div className='categories'>
        {categories.map(cat => (
          <div
            key={cat}
            className={'category ' + (selected === cat ? 'active' : '')}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </div>
        ))}
      </div>
    </aside>
  );
}
