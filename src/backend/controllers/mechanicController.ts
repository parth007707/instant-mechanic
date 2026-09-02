import { Request, Response, NextFunction } from 'express';
import { getMechanics, getMechanicById } from '../db/index.js';

export async function listMechanics(req: Request, res: Response, next: NextFunction) {
  try {
    const search = req.query.search as string;
    const status = req.query.status as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getMechanics({ search, status, page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getMechanic(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const mechanic = await getMechanicById(id);
    if (!mechanic) {
      return res.status(404).json({ error: 'Not Found', message: `Mechanic with ID ${id} not found` });
    }
    res.json(mechanic);
  } catch (err) {
    next(err);
  }
}
