import React from 'react';
import imageFile from './token.jpg';

const Token = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <img src={imageFile} alt="Token" style={{ width: '100%', height: 'auto' }} />
      <a href={imageFile} download>
        <button style={{ marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Download Image
        </button>
      </a>
    </div>
  );
};

export default Token;
