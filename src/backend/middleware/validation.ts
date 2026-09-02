import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createBookingSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  serviceId: z.string().min(1, 'Service ID is required'),
  mechanicId: z.string().optional(),
  scheduledAt: z.string().min(1, 'Scheduled date/time is required'),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  notes: z.string().optional()
});

export const updateBookingStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'ASSIGNED',
    'MECHANIC_ON_THE_WAY',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
  ]),
  note: z.string().optional(),
  mechanicId: z.string().optional()
});

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.issues.map((e) => ({ field: e.path.join('.'), message: e.message }))
        });
      }
      next(error);
    }
  };
}
