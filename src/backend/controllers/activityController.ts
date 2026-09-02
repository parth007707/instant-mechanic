import { Request, Response, NextFunction } from 'express';
import { getActivityFeed } from '../db/index.js';

export async function listActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = Number(req.query.limit) || 20;
    const activities = await getActivityFeed(limit);
    res.json({ data: activities, total: activities.length });
  } catch (err) {
    next(err);
  }
}
