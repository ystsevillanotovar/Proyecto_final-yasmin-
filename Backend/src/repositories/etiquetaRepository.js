import prisma from '../db/prisma.js';

export default {
  async findAll() {
    return prisma.etiqueta.findMany({
      orderBy: { nombre: 'asc' },
    });
  },

  async findById(id) {
    return prisma.etiqueta.findUnique({ where: { id } });
  },

  async findByIds(ids) {
    return prisma.etiqueta.findMany({
      where: { id: { in: ids } },
    });
  },
};
