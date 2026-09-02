import { Request, Response, NextFunction } from 'express';
import { getDashboardStats } from '../db/index.js';

export async function getAnalytics(req: Request, res: Response, next: NextFunction) {
  try {
    const timeframe = (req.query.timeframe as '7d' | '30d' | '90d') || '30d';
    const stats = await getDashboardStats(timeframe);
    res.json({
      timeframe,
      bookingsOverTime: stats.bookingsOverTime,
      revenueOverTime: stats.revenueOverTime,
      statusDistribution: stats.statusDistribution,
      serviceBreakdown: stats.serviceBreakdown
    });
  } catch (err) {
    next(err);
  }
}
