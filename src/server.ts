import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config();

// Importation de routers
import authRoutes from './routes/authRoutes';
import devisRoutes from './routes/devisRoutes';
import reclamationRoutes from './routes/reclamationRoutes';
import adminRoutes from './routes/adminRoutes';
import contactRoutes from './routes/contactRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/devis', devisRoutes);
app.use('/api/reclamations', reclamationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
// Healthcheck endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    message: 'Groupe Seghaier Backend API is running.',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`[Server]: API is running at http://localhost:${PORT}`);
});
