import { Request, Response, NextFunction } from 'express';
import { getServices } from '../db/index.js';

export async function listServices(req: Request, res: Response, next: NextFunction) {
  try {
    const services = await getServices();
    res.json({ data: services, total: services.length });
  } catch (err) {
    next(err);
  }
}
