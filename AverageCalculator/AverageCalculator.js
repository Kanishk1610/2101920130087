import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(http://localhost:9876/numbers/${numberId});
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from server.');
      setData(null);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <input
        type="text"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="Enter number ID (e.g., e, p, f, r)"
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>Previous Window State:</h2>
          <pre>{JSON.stringify(data.windowPrevState, null, 2)}</pre>
          <h2>Current Window State:</h2>
          <pre>{JSON.stringify(data.windowCurrState, null, 2)}</pre>
          <h2>Received Numbers:</h2>
          <pre>{JSON.stringify(data.numbers, null, 2)}</pre>
          <h2>Average:</h2>
          <pre>{data.avg}</pre>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;