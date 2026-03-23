const { useRunner } = require('react-runner');
const React = require('react');

const code = `
  import React, { useState } from 'react';
  export default function App() {
    return <div>Hello</div>;
  }
`;

try {
  const result = useRunner({ code, scope: { React } });
  console.log("Result element type:", typeof result.element);
  console.log("Result element:", result.element);
} catch (err) {
  console.error(err);
}
