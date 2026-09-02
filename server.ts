import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './src/backend/routes/apiRoutes.js';
import { errorHandler } from './src/backend/middleware/errorHandler.js';
import { swaggerSpec } from './src/backend/docs/swaggerSpec.js';
import { getDb } from './src/backend/db/index.js';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize PostgreSQL Database & Seed Data in Background
  getDb().then(() => {
    console.log('[Database] PostgreSQL Engine Initialized & Seeded.');
  }).catch((err) => {
    console.error('[Database Error] Failed to initialize PostgreSQL:', err);
  });

  // Swagger Documentation Route
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Instant Mechanic API Documentation',
    customCss: '.swagger-ui .topbar { display: none }'
  }));

  // REST API Routes FIRST
  app.use('/api', apiRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  // Vite Middleware (Development) vs Static Serving (Production)
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Instant Mechanic Server] Running at http://0.0.0.0:${PORT}`);
    console.log(`[API Docs] Swagger UI at http://0.0.0.0:${PORT}/api/docs`);
  });
}

startServer();
