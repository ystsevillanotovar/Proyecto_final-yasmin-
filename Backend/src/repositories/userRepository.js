import bcrypt from 'bcryptjs';
import prisma from '../db/prisma.js';
import { ulid } from 'ulid';
import ConflictError from '../errors/ConflictError.js';
import NotFoundError from '../errors/NotFoundError.js';

export default {
  async create(data) {
    const existing = await prisma.usuario.findFirst({
      where: { email: data.email, deleted_at: null },
    });
    if (existing) throw new ConflictError('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.usuario.create({
      data: {
        id: data.id || ulid(),
        email: data.email,
        password: hashedPassword,
        alias: data.alias,
        role: data.role || 'user',
        is_active: true,
      },
    });
  },

  async findAll({ page = 1, perPage = 10 } = {}) {
    const where = { deleted_at: null };

    const [items, total] = await Promise.all([
      prisma.usuario.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      prisma.usuario.count({ where }),
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

  async findByEmail(email) {
    return prisma.usuario.findFirst({
      where: { email, deleted_at: null },
    });
  },

  async findById(id) {
    return prisma.usuario.findFirst({
      where: { id, deleted_at: null },
    });
  },

  async update(id, data) {
    const { count } = await prisma.usuario.updateMany({
      where: { id, deleted_at: null },
      data,
    });
    if (count === 0) {
      throw new NotFoundError('User not found');
    }
    return prisma.usuario.findUnique({ where: { id } });
  },

  async delete(id) {
    const { count } = await prisma.usuario.updateMany({
      where: { id, deleted_at: null },
      data: { deleted_at: new Date() },
    });
    if (count === 0) {
      throw new NotFoundError('User not found');
    }
  },
};
