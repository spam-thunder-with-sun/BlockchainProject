const express = require('express');
const app = express();
const PORT = 3000;

// Define a route to handle the data request
app.get('/data', (req, res) => {
  // Generate a random data value
  const data = Math.floor(Math.random() * 100);

  // Simulate a delay before sending the response
  setTimeout(() => {
    res.json({ data });
  }, 2000); // Delay of 2 seconds
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
