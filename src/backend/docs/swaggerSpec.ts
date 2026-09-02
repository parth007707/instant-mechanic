import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Instant Mechanic — Live Operations Dashboard API',
      version: '1.0.0',
      description: 'Production REST API for Instant Mechanic Operations Dashboard',
      contact: {
        name: 'Instant Mechanic Operations Team',
        email: 'ops@instantmechanic.in'
      }
    },
    servers: [
      {
        url: '/api',
        description: 'Operations REST API Server'
      }
    ],
    components: {
      schemas: {
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            bookingNumber: { type: 'string', example: 'IM-10482' },
            customerId: { type: 'string' },
            vehicleId: { type: 'string' },
            serviceId: { type: 'string' },
            mechanicId: { type: 'string', nullable: true },
            status: {
              type: 'string',
              enum: ['PENDING', 'ASSIGNED', 'MECHANIC_ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
            },
            amount: { type: 'number', example: 4499 },
            scheduledAt: { type: 'string', format: 'date-time' },
            address: { type: 'string' }
          }
        },
        Mechanic: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string' },
            status: { type: 'string', enum: ['AVAILABLE', 'BUSY', 'ON_THE_WAY', 'OFFLINE'] },
            specialty: { type: 'string' },
            rating: { type: 'number' },
            jobsCompleted: { type: 'integer' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            timestamp: { type: 'string' },
            path: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/health': {
        get: {
          summary: 'Health Check Endpoint',
          responses: {
            '200': {
              description: 'API Service is healthy'
            }
          }
        }
      },
      '/dashboard': {
        get: {
          summary: 'Get Live Dashboard Statistics & Analytics',
          parameters: [
            {
              name: 'timeframe',
              in: 'query',
              schema: { type: 'string', enum: ['7d', '30d', '90d'] }
            }
          ],
          responses: {
            '200': {
              description: 'Live calculated statistics from PostgreSQL'
            }
          }
        }
      },
      '/bookings': {
        get: {
          summary: 'Get Paginated & Filtered Bookings List',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'status', in: 'query', schema: { type: 'string' } },
            { name: 'mechanicId', in: 'query', schema: { type: 'string' } },
            { name: 'serviceId', in: 'query', schema: { type: 'string' } },
            { name: 'from', in: 'query', schema: { type: 'string', format: 'date' } },
            { name: 'to', in: 'query', schema: { type: 'string', format: 'date' } },
            { name: 'sortBy', in: 'query', schema: { type: 'string' } },
            { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } }
          ],
          responses: {
            '200': { description: 'Paginated bookings list with total counts' }
          }
        },
        post: {
          summary: 'Create a New Booking',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['customerId', 'vehicleId', 'serviceId', 'scheduledAt', 'address'],
                  properties: {
                    customerId: { type: 'string' },
                    vehicleId: { type: 'string' },
                    serviceId: { type: 'string' },
                    mechanicId: { type: 'string' },
                    scheduledAt: { type: 'string', format: 'date-time' },
                    address: { type: 'string' },
                    notes: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Booking created' }
          }
        }
      },
      '/bookings/{id}': {
        get: {
          summary: 'Get Single Booking Details with Timeline History',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            '200': { description: 'Detailed booking object' },
            '404': { description: 'Booking not found' }
          }
        },
        patch: {
          summary: 'Update Booking Details',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Booking updated' } }
        }
      },
      '/bookings/{id}/status': {
        patch: {
          summary: 'Update Booking Status & Create Status History Record',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['PENDING', 'ASSIGNED', 'MECHANIC_ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
                    },
                    note: { type: 'string' },
                    mechanicId: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: { '200': { description: 'Status updated successfully' } }
        }
      },
      '/mechanics': {
        get: {
          summary: 'Get Mechanics List with Live Status & Jobs Count',
          responses: { '200': { description: 'Mechanics array' } }
        }
      },
      '/customers': {
        get: {
          summary: 'Get Customers List with Booking Totals & Spend',
          responses: { '200': { description: 'Customers array' } }
        }
      },
      '/services': {
        get: {
          summary: 'Get Service Catalog',
          responses: { '200': { description: 'Services list' } }
        }
      },
      '/activity': {
        get: {
          summary: 'Get Live Operational Activity Feed',
          responses: { '200': { description: 'Recent activity feed array' } }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJSDoc(options);
