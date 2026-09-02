import { Request, Response, NextFunction } from 'express';
import { getDashboardStats } from '../db/index.js';

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const timeframe = (req.query.timeframe as '7d' | '30d' | '90d') || '30d';
    const stats = await getDashboardStats(timeframe);
    res.json(stats);
  } catch (err) {
    next(err);
  }
}
