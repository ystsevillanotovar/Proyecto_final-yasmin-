import { z } from 'zod';

export default z.object({
  completado: z.boolean().default(true),
  notas: z.string().optional(),
  valoracion: z.number().int().min(1).max(5).optional(),
});
