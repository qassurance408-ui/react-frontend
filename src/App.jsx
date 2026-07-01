import { useEffect, useState } from 'react';

// Set VITE_API_URL as a build-time env var in AletCloud once the backend
// is deployed. If it isn't picked up, edit the fallback below and push again.
const API_URL = import.meta.env.VITE_API_URL || 'https://fullstack-react-node.app.aletcloud.com/back';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card">
      <h1>Fullstack Demo</h1>
      <p className="subtitle">React frontend → Node backend on AletCloud</p>

      {error && <p className="error">Couldn't reach the backend: {error}</p>}
      {!error && !data && <p className="loading">Loading…</p>}
      {data && (
        <div className="result">
          <p>{data.message}</p>
          <p className="timestamp">{data.timestamp}</p>
        </div>
      )}

      <p className="hint">
        API URL: <code>{API_URL}</code>
      </p>
    </div>
  );
}

export default App;
