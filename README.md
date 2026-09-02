# Instant Mechanic — Live Vehicle Service Operations Dashboard

A production-style full-stack vehicle service operations dashboard for managing bookings, mechanics, customers, vehicles, services, analytics, and live operational activity.

## 🚗 Overview

Instant Mechanic provides a real-time operations view for an automotive service company.

The dashboard includes:

- Total bookings
- Today's bookings
- Completed, pending and cancelled bookings
- Revenue tracking
- Active mechanics
- New customers
- Booking analytics
- Revenue analytics
- Booking status distribution
- Service category analytics
- Booking search, filtering, sorting and pagination
- Mechanics management
- Customer and vehicle information
- Booking creation
- Live activity monitoring
- Automatic live dashboard polling

## ✨ Key Features

### Dashboard
- Real-time operational KPIs
- Revenue overview
- Booking statistics
- Active mechanics
- New customer metrics

### Analytics
- Booking trends over time
- Revenue trends
- Booking status distribution
- Service category analysis

### Bookings
- View bookings in a production-style table
- Search bookings
- Filter by status/category
- Sort and paginate records
- View customer, vehicle, service and mechanic information
- Create new bookings

### Mechanics
- Mechanic availability/status
- Jobs completed
- Current assignments
- Latest booking information

### Live Operations
- Automatic dashboard polling every 12 seconds
- Live activity feed
- Database-backed operational updates
- No full-page reload required for live updates

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Modern component-based UI

### Backend
- Node.js
- TypeScript
- REST API
- Server-side database access

### Database
- PostgreSQL
- Neon PostgreSQL
- Prisma ORM

### Development & Deployment
- Google AI Studio Build
- GitHub
- Vercel
- AWS
- Neon PostgreSQL

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│        React Frontend       │
│   Dashboard / Analytics     │
│   Bookings / Mechanics      │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│       Node.js Backend       │
│        API Endpoints        │
│     Business Logic          │
└──────────────┬──────────────┘
               │ Prisma
               ▼
┌─────────────────────────────┐
│      Neon PostgreSQL        │
│                             │
│ Bookings / Customers        │
│ Mechanics / Vehicles        │
│ Services / Activities       │
│ Status History              │
└─────────────────────────────┘
