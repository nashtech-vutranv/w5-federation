import React, { useState } from 'react';

export default function Test() {
  const [state, setState] = useState('test component')
  return (
    <div>{state}</div>
  )
}