const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h2>Count: {count}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={() => setCount(count + 1)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Plus</button>
        <button onClick={() => setCount(count - 1)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Minus</button>
      </div>
    </div>
  );
};
render(<Counter />);