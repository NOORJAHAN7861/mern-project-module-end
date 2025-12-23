
const express = require('express');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./app/routes/authRoutes');
const customerRoutes = require('./app/routes/customerRoutes');
const caseRoutes = require('./app/routes/caseRoutes');

const errorHandler = require('./app/middleware/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/profile', authRoutes); 


app.use(errorHandler);

connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`CRM API running on port ${port}`));
});