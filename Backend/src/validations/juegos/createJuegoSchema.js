import { z } from 'zod';

export default z.object({
  nombre: z.string().min(1, 'Nombre is required'),
  categoria_id: z.string().min(1, 'Categoria is required'),
  puntuacion_metacritic: z.number().int().min(0).max(100),
  horas_dedicacion: z.number().positive('Hours must be positive'),
  etiqueta_ids: z.array(z.string()).optional().default([]),
});
