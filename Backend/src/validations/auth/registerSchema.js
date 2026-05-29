import { z } from 'zod';

export default z.object({
  email: z.string().email('Invalid email format'),
  alias: z.string().min(1, 'Alias is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
