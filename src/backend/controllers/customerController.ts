import { Request, Response, NextFunction } from 'express';
import { getCustomers, getCustomerById, getVehicles } from '../db/index.js';

export async function listCustomers(req: Request, res: Response, next: NextFunction) {
  try {
    const search = req.query.search as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getCustomers({ search, page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ error: 'Not Found', message: `Customer with ID ${id} not found` });
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

export async function listVehicles(req: Request, res: Response, next: NextFunction) {
  try {
    const vehicles = await getVehicles();
    res.json({ data: vehicles, total: vehicles.length });
  } catch (err) {
    next(err);
  }
}
