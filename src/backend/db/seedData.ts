// Seed data generator for Instant Mechanic

export interface RawCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface RawVehicle {
  id: string;
  customerId: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  vehicleType: string;
  createdAt: Date;
}

export interface RawMechanic {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'AVAILABLE' | 'BUSY' | 'ON_THE_WAY' | 'OFFLINE';
  specialty: string;
  rating: number;
  jobsCompleted: number;
  createdAt: Date;
}

export interface RawService {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  estimatedDuration: string;
  createdAt: Date;
}

export interface RawBooking {
  id: string;
  bookingNumber: string;
  customerId: string;
  vehicleId: string;
  serviceId: string;
  mechanicId: string | null;
  status: 'PENDING' | 'ASSIGNED' | 'MECHANIC_ON_THE_WAY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  scheduledAt: Date;
  address: string;
  notes: string | null;
  createdAt: Date;
}

export interface RawStatusHistory {
  id: string;
  bookingId: string;
  status: string;
  note: string | null;
  changedAt: Date;
}

const INDIAN_FIRST_NAMES = [
  'Rahul', 'Priya', 'Vikram', 'Ananya', 'Rajesh', 'Kavita', 'Amit', 'Sneha',
  'Sanjay', 'Deepika', 'Arjun', 'Meera', 'Rohan', 'Pooja', 'Suresh', 'Divya',
  'Karan', 'Neha', 'Alok', 'Ritu', 'Sunil', 'Aarti', 'Manish', 'Shweta',
  'Gaurav', 'Nisha', 'Varun', 'Anjali', 'Vijay', 'Bhavna', 'Prateek', 'Simran',
  'Ashok', 'Tanya', 'Nikhil', 'Swati', 'Tarun', 'Isha', 'Harish', 'Komal',
  'Yash', 'Shruti', 'Pankaj', 'Payal', 'Abhishek', 'Rachna', 'Vikas', 'Preeti',
  'Aditya', 'Jyoti'
];

const INDIAN_LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Iyer', 'Nair',
  'Deshmukh', 'Chowdhury', 'Reddy', 'Rao', 'Joshi', 'Bhat', 'Mehta', 'Shah',
  'Aggarwal', 'Kulkarni', 'Pillai', 'Menon', 'Banerjee', 'Mishra', 'Trivedi',
  'Malhotra', 'Kapoor', 'Sengupta', 'Das', 'Dutta', 'Hegde', 'Shetty'
];

const VEHICLE_MAKES = [
  { make: 'Maruti Suzuki', models: ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Dzire', 'WagonR'], type: 'Hatchback' },
  { make: 'Hyundai', models: ['Creta', 'Venue', 'i20', 'Verna', 'Aura', 'Alcazar'], type: 'SUV' },
  { make: 'Tata', models: ['Nexon', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tiago'], type: 'SUV' },
  { make: 'Mahindra', models: ['XUV700', 'Thar', 'Scorpio-N', 'XUV300', 'Bolero'], type: 'SUV' },
  { make: 'Honda', models: ['City', 'Amaze', 'Elevate', 'Civic'], type: 'Sedan' },
  { make: 'Toyota', models: ['Fortuner', 'Innova Crysta', 'Urban Cruiser', 'Glanza', 'Camry'], type: 'SUV' },
  { make: 'Kia', models: ['Seltos', 'Sonet', 'Carens'], type: 'SUV' },
  { make: 'Volkswagen', models: ['Taigun', 'Virtus', 'Polo'], type: 'Sedan' }
];

const STATE_CODES = ['MH', 'KA', 'DL', 'TN', 'HR', 'GJ', 'UP', 'TS', 'WB'];

const MECHANIC_NAMES = [
  { name: 'Ramesh Kumar', specialty: 'Engine Diagnostics', phone: '+919820123456' },
  { name: 'Suresh Patil', specialty: 'Brake & Suspension', phone: '+919820234567' },
  { name: 'Mahesh Vishwakarma', specialty: 'Periodic Maintenance', phone: '+919820345678' },
  { name: 'Ganesh Naik', specialty: 'Electrical & AC', phone: '+919820456789' },
  { name: 'Salim Khan', specialty: 'Transmission & Clutch', phone: '+919820567890' },
  { name: 'Dinesh Yadav', specialty: 'Periodic Maintenance', phone: '+919820678901' },
  { name: 'Vijay Pawar', specialty: 'Engine Overhaul', phone: '+919820789012' },
  { name: 'Anil Shinde', specialty: 'Tyre & Alignment', phone: '+919820890123' },
  { name: 'Sunil Mistri', specialty: 'Battery & Electrical', phone: '+919820901234' },
  { name: 'Praveen Chaurasia', specialty: 'Brake & Suspension', phone: '+919821012345' },
  { name: 'Akash Sawant', specialty: 'AC Service & Gas', phone: '+919821123456' },
  { name: 'Deepak Thorat', specialty: 'Periodic Maintenance', phone: '+919821234567' },
  { name: 'Imran Shaikh', specialty: 'Engine Diagnostics', phone: '+919821345678' },
  { name: 'Sanjay Sutar', specialty: 'Transmission & Clutch', phone: '+919821456789' },
  { name: 'Rahul Rane', specialty: 'Tyre & Alignment', phone: '+919821567890' },
  { name: 'Manoj Jadhav', specialty: 'Battery & Electrical', phone: '+919821678901' },
  { name: 'Kiran Kadam', specialty: 'Body & Paint Care', phone: '+919821789012' },
  { name: 'Rakesh More', specialty: 'Periodic Maintenance', phone: '+919821890123' },
  { name: 'Rajendra Solanki', specialty: 'Engine Overhaul', phone: '+919821901234' },
  { name: 'Mukesh Carpenter', specialty: 'Brake & Suspension', phone: '+919822012345' },
  { name: 'Santosh Kamble', specialty: 'AC Service & Repair', phone: '+919822123456' },
  { name: 'Pradeep Pal', specialty: 'Periodic Maintenance', phone: '+919822234567' }
];

export const SERVICES_DATA = [
  {
    id: 'srv-1',
    name: 'Full Periodic Service',
    category: 'Periodic Service',
    description: 'Comprehensive 50-point inspection, engine oil replacement, oil filter change, air filter cleaning, coolant top-up & brake fluid check.',
    basePrice: 4499,
    estimatedDuration: '3.5 Hours'
  },
  {
    id: 'srv-2',
    name: 'Synthetic Oil Change',
    category: 'Oil Change',
    description: '100% Fully Synthetic Engine Oil change (4L), OEM Oil Filter replacement & fluid check.',
    basePrice: 2499,
    estimatedDuration: '1.5 Hours'
  },
  {
    id: 'srv-3',
    name: 'Brake Pad Replacement & Inspection',
    category: 'Brake Service',
    description: 'Front & Rear brake pad inspection, replacement, rotor cleaning & brake fluid bleeding.',
    basePrice: 1899,
    estimatedDuration: '2.0 Hours'
  },
  {
    id: 'srv-4',
    name: 'Car Battery Replacement & Testing',
    category: 'Battery',
    description: 'On-site 12V Exide/Amaron battery replacement with warranty, terminal cleaning & alternator testing.',
    basePrice: 3999,
    estimatedDuration: '1.0 Hour'
  },
  {
    id: 'srv-5',
    name: 'Complete AC Servicing & Gas Top-up',
    category: 'AC Service',
    description: 'AC filter cleaning, evaporator coil check, R134a refrigerant gas refill & leak detection test.',
    basePrice: 2199,
    estimatedDuration: '2.5 Hours'
  },
  {
    id: 'srv-6',
    name: 'Wheel Balancing & 3D Alignment',
    category: 'Tyre Service',
    description: 'Computerized 4-wheel alignment, 4-wheel balancing with lead weights & tyre rotation.',
    basePrice: 1299,
    estimatedDuration: '1.5 Hours'
  },
  {
    id: 'srv-7',
    name: 'Advanced OBD Engine Diagnostics',
    category: 'Engine Diagnostics',
    description: 'Computerized scanner fault code reading (DTC), sensor testing, ECU health check & report.',
    basePrice: 1499,
    estimatedDuration: '1.0 Hour'
  },
  {
    id: 'srv-8',
    name: 'Deep Foam Wash & Interior Detailing',
    category: 'Car Wash',
    description: 'Exterior high-pressure foam wash, underbody cleaning, vacuuming, dashboard polishing & tyre dressing.',
    basePrice: 999,
    estimatedDuration: '2.0 Hours'
  }
];

export function generateSeedData() {
  const now = new Date();

  // 1. Customers (55 customers)
  const customers: RawCustomer[] = [];
  for (let i = 1; i <= 55; i++) {
    const fn = INDIAN_FIRST_NAMES[i % INDIAN_FIRST_NAMES.length];
    const ln = INDIAN_LAST_NAMES[i % INDIAN_LAST_NAMES.length];
    const createdDaysAgo = Math.floor(Math.random() * 90) + 10;
    const createdAt = new Date(now.getTime() - createdDaysAgo * 24 * 60 * 60 * 1000);
    
    customers.push({
      id: `cust-${i}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
      phone: `+91${9800000000 + Math.floor(Math.random() * 199999999)}`,
      createdAt
    });
  }

  // 2. Vehicles (110 vehicles)
  const vehicles: RawVehicle[] = [];
  let vehicleCounter = 1;
  customers.forEach((c) => {
    // 1 to 3 vehicles per customer
    const count = (vehicleCounter % 2) + 1;
    for (let v = 0; v < count; v++) {
      const makeObj = VEHICLE_MAKES[vehicleCounter % VEHICLE_MAKES.length];
      const model = makeObj.models[vehicleCounter % makeObj.models.length];
      const state = STATE_CODES[vehicleCounter % STATE_CODES.length];
      const rnum = `${state}${String((vehicleCounter % 15) + 1).padStart(2, '0')}${String.fromCharCode(65 + (vehicleCounter % 26))}${String.fromCharCode(65 + ((vehicleCounter * 3) % 26))}${1000 + (vehicleCounter * 17) % 8999}`;
      
      vehicles.push({
        id: `veh-${vehicleCounter}`,
        customerId: c.id,
        registrationNumber: rnum,
        make: makeObj.make,
        model,
        year: 2017 + (vehicleCounter % 8),
        vehicleType: makeObj.type,
        createdAt: c.createdAt
      });
      vehicleCounter++;
    }
  });

  // 3. Mechanics (22 mechanics)
  const mechanics: RawMechanic[] = MECHANIC_NAMES.map((m, idx) => {
    const statuses: Array<'AVAILABLE' | 'BUSY' | 'ON_THE_WAY' | 'OFFLINE'> = [
      'AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'BUSY', 'BUSY', 'ON_THE_WAY', 'OFFLINE'
    ];
    const status = statuses[idx % statuses.length];
    return {
      id: `mech-${idx + 1}`,
      name: m.name,
      email: `${m.name.toLowerCase().replace(/\s+/g, '.')}@instantmechanic.in`,
      phone: m.phone,
      status,
      specialty: m.specialty,
      rating: +(4.4 + (idx % 7) * 0.1).toFixed(1),
      jobsCompleted: 35 + (idx * 14) % 180,
      createdAt: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000)
    };
  });

  // 4. Services
  const services: RawService[] = SERVICES_DATA.map((s) => ({
    ...s,
    createdAt: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
  }));

  // 5. Bookings (520+ bookings across past 90 days to today)
  const bookings: RawBooking[] = [];
  const statusHistories: RawStatusHistory[] = [];

  const statuses: Array<'PENDING' | 'ASSIGNED' | 'MECHANIC_ON_THE_WAY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'> = [
    'COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED',
    'IN_PROGRESS', 'MECHANIC_ON_THE_WAY', 'ASSIGNED', 'PENDING', 'CANCELLED'
  ];

  const ADDRESSES = [
    'Flat 402, Sunshine Apartments, HSR Layout, Bengaluru',
    'House #84, Sector 15, Gurgaon, Haryana',
    '12th Cross, Indiranagar, Bengaluru, Karnataka',
    'Plot 18, Jubilee Hills, Hyderabad, Telangana',
    'Flat B-3, Raheja Complex, Bandra West, Mumbai',
    'C-45, Vasant Kunj, New Delhi',
    '7th Main, Koramangala 4th Block, Bengaluru',
    'Flat 101, Oakwood Residency, Gachibowli, Hyderabad',
    'No 45, Anna Nagar East, Chennai, Tamil Nadu',
    'B-604, Godrej Garden City, SG Highway, Ahmedabad'
  ];

  let historyCounter = 1;
  const totalBookingsToGenerate = 535;

  for (let i = 1; i <= totalBookingsToGenerate; i++) {
    const customer = customers[i % customers.length];
    const customerVehicles = vehicles.filter((v) => v.customerId === customer.id);
    const vehicle = customerVehicles.length > 0 ? customerVehicles[i % customerVehicles.length] : vehicles[i % vehicles.length];
    const service = services[i % services.length];

    // Distribute date over past 90 days (more recent bookings today/yesterday)
    let daysAgo: number;
    if (i > 480) {
      // Today / yesterday (for real-time live feel)
      daysAgo = Math.random() < 0.6 ? 0 : 1;
    } else {
      daysAgo = Math.floor(Math.pow(Math.random(), 1.2) * 90);
    }

    const scheduledDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    // Add random hour between 8 AM and 7 PM
    scheduledDate.setHours(8 + Math.floor(Math.random() * 11), Math.floor(Math.random() * 60), 0, 0);

    // Status assignment
    let status: 'PENDING' | 'ASSIGNED' | 'MECHANIC_ON_THE_WAY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    if (daysAgo > 3) {
      // Past bookings mostly completed or cancelled
      status = Math.random() < 0.88 ? 'COMPLETED' : 'CANCELLED';
    } else if (daysAgo === 0) {
      // Today's bookings spread across pending, assigned, in progress, mechanic on the way
      const todayStatuses: Array<'PENDING' | 'ASSIGNED' | 'MECHANIC_ON_THE_WAY' | 'IN_PROGRESS' | 'COMPLETED'> = [
        'PENDING', 'ASSIGNED', 'MECHANIC_ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED'
      ];
      status = todayStatuses[i % todayStatuses.length];
    } else {
      status = statuses[i % statuses.length];
    }

    const assignedMechanic = status === 'PENDING' ? null : mechanics[i % mechanics.length];
    const priceVariance = (i % 5) * 100;
    const amount = service.basePrice + priceVariance;

    const bookingId = `bkg-${i}`;
    const bookingNumber = `IM-${10400 + i}`;

    bookings.push({
      id: bookingId,
      bookingNumber,
      customerId: customer.id,
      vehicleId: vehicle.id,
      serviceId: service.id,
      mechanicId: assignedMechanic ? assignedMechanic.id : null,
      status,
      amount,
      scheduledAt: scheduledDate,
      address: ADDRESSES[i % ADDRESSES.length],
      notes: i % 3 === 0 ? `Customer requested urgent inspection of ${service.category.toLowerCase()}.` : null,
      createdAt: new Date(scheduledDate.getTime() - 2 * 60 * 60 * 1000)
    });

    // Generate timeline history records for each booking
    const createdTime = new Date(scheduledDate.getTime() - 2 * 60 * 60 * 1000);
    statusHistories.push({
      id: `hist-${historyCounter++}`,
      bookingId,
      status: 'PENDING',
      note: 'Booking requested by customer via Instant Mechanic app',
      changedAt: createdTime
    });

    if (status !== 'PENDING') {
      const assignedTime = new Date(createdTime.getTime() + 15 * 60 * 1000);
      statusHistories.push({
        id: `hist-${historyCounter++}`,
        bookingId,
        status: 'ASSIGNED',
        note: `Assigned to mechanic ${assignedMechanic?.name || 'Operations Team'}`,
        changedAt: assignedTime
      });

      if (['MECHANIC_ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
        const onWayTime = new Date(assignedTime.getTime() + 30 * 60 * 1000);
        statusHistories.push({
          id: `hist-${historyCounter++}`,
          bookingId,
          status: 'MECHANIC_ON_THE_WAY',
          note: `${assignedMechanic?.name} dispatched to customer location`,
          changedAt: onWayTime
        });
      }

      if (['IN_PROGRESS', 'COMPLETED'].includes(status)) {
        const inProgressTime = new Date(assignedTime.getTime() + 60 * 60 * 1000);
        statusHistories.push({
          id: `hist-${historyCounter++}`,
          bookingId,
          status: 'IN_PROGRESS',
          note: `Service started on ${vehicle.make} ${vehicle.model} (${vehicle.registrationNumber})`,
          changedAt: inProgressTime
        });
      }

      if (status === 'COMPLETED') {
        const completedTime = new Date(assignedTime.getTime() + 150 * 60 * 1000);
        statusHistories.push({
          id: `hist-${historyCounter++}`,
          bookingId,
          status: 'COMPLETED',
          note: `Service completed successfully. Customer payment of ₹${amount} received.`,
          changedAt: completedTime
        });
      }
    }

    if (status === 'CANCELLED') {
      const cancelledTime = new Date(createdTime.getTime() + 45 * 60 * 1000);
      statusHistories.push({
        id: `hist-${historyCounter++}`,
        bookingId,
        status: 'CANCELLED',
        note: 'Cancelled by customer due to schedule conflict',
        changedAt: cancelledTime
      });
    }
  }

  return {
    customers,
    vehicles,
    mechanics,
    services,
    bookings,
    statusHistories
  };
}
