import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import notFoundHandler from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import auth, { extractBearerToken } from './middlewares/auth.js';

// Status
import statusCheck from './controllers/status/check.js';

// Auth
import authRegister from './controllers/auth/register.js';
import authLogin from './controllers/auth/login.js';

// Juegos
import juegosList from './controllers/juegos/list.js';
import juegosRecomendados from './controllers/juegos/recomendados.js';
import juegosGet from './controllers/juegos/get.js';
import juegosCreate from './controllers/juegos/create.js';
import juegosUpdate from './controllers/juegos/update.js';
import juegosDelete from './controllers/juegos/delete.js';
import juegosComplete from './controllers/juegos/complete.js';

// Categorias
import categoriasList from './controllers/categorias/list.js';

// Etiquetas
import etiquetasList from './controllers/etiquetas/list.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*'
}));

app.use(express.json());
app.use(extractBearerToken);

// Routes
app.get('/juegos', auth({ required: true }), juegosList);
app.get('/juegos/recomendados', auth({ required: true }), juegosRecomendados);
app.get('/juegos/:id', auth({ required: true }), juegosGet);
app.post('/juegos', auth({ required: true }), juegosCreate);
app.put('/juegos/:id', auth({ required: true }), juegosUpdate);
app.delete('/juegos/:id', auth({ required: true }), juegosDelete);
app.patch('/juegos/:id/completado', auth({ required: true }), juegosComplete);

// Categorias
app.get('/categorias', auth({ required: true }), categoriasList);

// Etiquetas
app.get('/etiquetas', auth({ required: true }), etiquetasList);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
