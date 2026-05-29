import prisma from '../db/prisma.js';
import { ulid } from 'ulid';
import NotFoundError from '../errors/NotFoundError.js';

export default {
  async create(data) {
    return prisma.juego.create({
      data: {
        id: data.id || ulid(),
        nombre: data.nombre,
        categoria_id: data.categoria_id,
        puntuacion_metacritic: data.puntuacion_metacritic,
        horas_dedicacion: data.horas_dedicacion,
        completado: false,
        usuario_id: data.usuario_id,
        etiquetas: data.etiqueta_ids?.length
          ? {
              create: data.etiqueta_ids.map(etiqueta_id => ({ etiqueta_id })),
            }
          : undefined,
      },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
  },

  async findAllByUser(usuario_id, { page = 1, perPage = 10, nombre, categoria_id, etiqueta_id, completado, sortBy, sortOrder } = {}) {
    const where = {
      usuario_id,
      deleted_at: null,
      ...(nombre ? { nombre: { contains: nombre } } : {}),
      ...(categoria_id ? { categoria_id } : {}),
      ...(etiqueta_id ? { etiquetas: { some: { etiqueta_id } } } : {}),
      ...(completado !== undefined ? { completado: Boolean(completado) } : {}),
    };

    const orderBy = [];
    if (sortBy === 'prioridad') {
      orderBy.push({ puntuacion_metacritic: sortOrder === 'asc' ? 'asc' : 'desc' });
    } else if (sortBy === 'puntuacion') {
      orderBy.push({ puntuacion_metacritic: sortOrder === 'asc' ? 'asc' : 'desc' });
    } else if (sortBy === 'horas') {
      orderBy.push({ horas_dedicacion: sortOrder === 'asc' ? 'asc' : 'desc' });
    } else if (sortBy === 'nombre') {
      orderBy.push({ nombre: sortOrder === 'asc' ? 'asc' : 'desc' });
    } else {
      orderBy.push({ created_at: 'desc' });
    }

    const [items, total] = await Promise.all([
      prisma.juego.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy,
        include: {
          categoria: true,
          etiquetas: { include: { etiqueta: true } },
        },
      }),
      prisma.juego.count({ where }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
      items,
      meta: {
        pagination: {
          current_page: page,
          per_page: perPage,
          total_pages: totalPages,
          total_items: total,
        },
      },
    };
  },

  async findRecomendados(usuario_id) {
    return prisma.juego.findMany({
      where: {
        usuario_id,
        completado: false,
        deleted_at: null,
      },
      orderBy: [
        { puntuacion_metacritic: 'desc' },
      ],
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
  },

  async findById(id, usuario_id) {
    const juego = await prisma.juego.findFirst({
      where: { id, usuario_id, deleted_at: null },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
    if (!juego) throw new NotFoundError('Juego not found');
    return juego;
  },

  async update(id, usuario_id, data) {
    const { count } = await prisma.juego.updateMany({
      where: { id, usuario_id, deleted_at: null },
      data,
    });
    if (count === 0) throw new NotFoundError('Juego not found');

    if (data.etiqueta_ids !== undefined) {
      await prisma.juegoEtiqueta.deleteMany({ where: { juego_id: id } });
      if (data.etiqueta_ids.length > 0) {
        await prisma.juegoEtiqueta.createMany({
          data: data.etiqueta_ids.map(etiqueta_id => ({ juego_id: id, etiqueta_id })),
        });
      }
    }

    return prisma.juego.findFirst({
      where: { id, deleted_at: null },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
  },

  async complete(id, usuario_id, data) {
    const { count } = await prisma.juego.updateMany({
      where: { id, usuario_id, deleted_at: null },
      data: {
        completado: true,
        fecha_completado: new Date(),
        ...(data.notas !== undefined ? { notas: data.notas } : {}),
        ...(data.valoracion !== undefined ? { valoracion: data.valoracion } : {}),
      },
    });
    if (count === 0) throw new NotFoundError('Juego not found');

    return prisma.juego.findFirst({
      where: { id, deleted_at: null },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
  },

  async delete(id, usuario_id) {
    const { count } = await prisma.juego.updateMany({
      where: { id, usuario_id, deleted_at: null },
      data: { deleted_at: new Date() },
    });
    if (count === 0) throw new NotFoundError('Juego not found');
  },
};
