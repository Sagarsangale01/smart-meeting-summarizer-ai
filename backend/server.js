const express = require('express');
const cors = require('cors');
require('dotenv').config();

const summaryRoutes = require('./routes/summaryRoutes');
const regenerateRoutes = require('./routes/regenerateRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', summaryRoutes);
app.use('/api', regenerateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
