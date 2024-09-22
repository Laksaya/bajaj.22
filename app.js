import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputValue);
      // Call the REST API with the parsed JSON data
      fetch('https://your-backend-api.com/process-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => setResponse(data))
        .catch((error) => setError(error.message));
    } catch (error) {
      setError('Invalid JSON input');
    }
  };

  return (
    <div>
      <h1>Roll Number: Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <MultiSelectDropdown response={response} />
        </div>
      )}
    </div>
  );
}

export default App;