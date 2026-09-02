import { Request, Response, NextFunction } from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus
} from '../db/index.js';
import { BookingQueryParams, BookingStatus } from '../../types/index.js';

export async function listBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const params: BookingQueryParams = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      search: req.query.search as string,
      status: req.query.status as string,
      mechanicId: req.query.mechanicId as string,
      serviceId: req.query.serviceId as string,
      from: req.query.from as string,
      to: req.query.to as string,
      sortBy: req.query.sortBy as string,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
    };

    const result = await getBookings(params);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Not Found', message: `Booking with ID ${id} not found` });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function addBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
}

export async function changeBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status, note, mechanicId } = req.body;

    const updated = await updateBookingStatus(id, status as BookingStatus, note, mechanicId);
    if (!updated) {
      return res.status(404).json({ error: 'Not Found', message: `Booking with ID ${id} not found` });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function updateBookingDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status, note, mechanicId } = req.body;
    const updated = await updateBookingStatus(id, status as BookingStatus, note, mechanicId);
    if (!updated) {
      return res.status(404).json({ error: 'Not Found', message: `Booking with ID ${id} not found` });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
