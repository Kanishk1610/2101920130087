const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

let windowSize = 10;
let numbers = [];

app.get('/numbers/:numberid', async (req, res) => {
  const numberid = req.params.numberid;
  const apiEndpoint = `https://test-server-api.com/${numberid}`; 

  try {
    const response = await axios.get(apiEndpoint, { timeout: 500 });
    const newNumbers = response.data.numbers;

    
    const filteredNewNumbers = newNumbers.filter(num => typeof num === 'number');

    
    numbers = [...new Set([...numbers, ...filteredNewNumbers])].slice(-windowSize);

    
    const avg = numbers.length > 0 ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length : 0;

    
    const prevWindowState = numbers.slice(0, Math.max(0, numbers.length - filteredNewNumbers.length));

    
    res.json({
      windowPrevState: prevWindowState,
      windowCurrState: numbers,
      numbers: filteredNewNumbers,
      avg: avg.toFixed(2),
    });
  } catch (error) {
    
    if (error.code === 'ECONNABORTED') {
      res.status(500).json({ error: 'Request timed out. Please try again later.' });
    } else if (error.response) {
      res.status(500).json({ error: `Failed to fetch data: ${error.response.statusText}` });
    } else {
      res.status(500).json({ error: 'Failed to fetch data from server.' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
