import express from 'express';
import contractRoutes from './routes/contractRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/api', contractRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});