const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.post('/customers', (req, res) => {
  // Handle the login or signup request here
  // You can access the posted data using req.body

  // Placeholder response
  res.json({ message: 'Success' });
});

app.listen(9090, () => {
  console.log('Server is running on port 9090');
});
