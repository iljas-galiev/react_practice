import React, { useState } from 'react';

const Examples = ({error, children, size, list = [], addToList}) => {
  const [value, setValue] = useState('');
  const handleInputChange = (ev) => setValue(ev.target.value);
  const addElement = () => addToList(value);
  const style = { color: error ? 'red' : 'green' };

  return (
    <>
      <div style={style}>
        {children} size: {size}
      </div>
      {list.length > 0 && (
        <ul>
          {list.map((listItem, i) => (
            <li key={i}>{listItem.name}</li>
          ))}
        </ul>
      )}
      <input value={value} onChange={handleInputChange} type="text" />
      <button type="button" onClick={addElement}>
        Click!
      </button>
    </>
  );
};

export default Examples;
