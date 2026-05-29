import prisma from '../db/prisma.js';
import NotFoundError from '../errors/NotFoundError.js';

export default {
  async findAll() {
    return prisma.categoria.findMany({
      orderBy: { nombre: 'asc' },
    });
  },

  async findById(id) {
    const categoria = await prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundError('Categoria not found');
    return categoria;
  },

  async findBySlug(slug) {
    return prisma.categoria.findUnique({ where: { slug } });
  },
};
