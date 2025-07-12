import React from 'react';
import { HashLoader } from 'react-spinners';

export default function LoadingSpinnerSmall() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#f6f6f6',
        flexDirection: 'column',
        borderRadius: '50%',
        gap: '20px',
      }}
    >
      <HashLoader color="#1217b5" size={30} speedMultiplier={2} />
    </div>
  );
}