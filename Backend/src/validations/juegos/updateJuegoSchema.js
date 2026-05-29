import { z } from 'zod';

export default z.object({
  nombre: z.string().min(1, 'Nombre is required').optional(),
  categoria_id: z.string().min(1, 'Categoria is required').optional(),
  puntuacion_metacritic: z.number().int().min(0).max(100).optional(),
  horas_dedicacion: z.number().positive('Hours must be positive').optional(),
  etiqueta_ids: z.array(z.string()).optional(),
});
