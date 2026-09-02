import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import {
  listBookings,
  getBooking,
  addBooking,
  changeBookingStatus,
  updateBookingDetails
} from '../controllers/bookingController.js';
import { listMechanics, getMechanic } from '../controllers/mechanicController.js';
import { listCustomers, getCustomer, listVehicles } from '../controllers/customerController.js';
import { listServices } from '../controllers/serviceController.js';
import { getAnalytics } from '../controllers/analyticsController.js';
import { listActivity } from '../controllers/activityController.js';
import { validateBody, createBookingSchema, updateBookingStatusSchema } from '../middleware/validation.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Instant Mechanic Operations Dashboard API',
    timestamp: new Date().toISOString()
  });
});

// Dashboard & Analytics
router.get('/dashboard', getDashboard);
router.get('/analytics', getAnalytics);
router.get('/activity', listActivity);

// Bookings
router.get('/bookings', listBookings);
router.get('/bookings/:id', getBooking);
router.post('/bookings', validateBody(createBookingSchema), addBooking);
router.patch('/bookings/:id', updateBookingDetails);
router.patch('/bookings/:id/status', validateBody(updateBookingStatusSchema), changeBookingStatus);

// Mechanics
router.get('/mechanics', listMechanics);
router.get('/mechanics/:id', getMechanic);

// Customers & Vehicles
router.get('/customers', listCustomers);
router.get('/customers/:id', getCustomer);
router.get('/vehicles', listVehicles);

// Services
router.get('/services', listServices);

export default router;
