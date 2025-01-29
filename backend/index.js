
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes').router;
const crudRoutes = require('./crudRoutes');
const orderRoutes = require('./orderRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const rfidRoutes = require('./rfidRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', crudRoutes);
app.use('/api', orderRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', rfidRoutes);

app.get('/', (req, res) => {
  res.send('VoulezVous Backend is running with RFID Integration.');
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
