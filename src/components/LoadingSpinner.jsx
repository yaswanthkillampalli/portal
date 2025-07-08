import React from 'react';
import { HashLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <HashLoader color="#1217b5" size={50} speedMultiplier={2} />
    </div>
  );
}