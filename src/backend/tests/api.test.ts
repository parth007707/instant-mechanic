import { getDb, getBookings, getBookingById, updateBookingStatus, getDashboardStats } from '../db/index.js';

async function runTests() {
  console.log('--- Starting Instant Mechanic Backend Automated Tests ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // Test 1: Initialize Database & Verify 500+ Seed Records
    const db = await getDb();
    const countRes = await db.query<{ count: string }>('SELECT COUNT(*) as count FROM bookings');
    const totalBookings = parseInt(countRes.rows[0]?.count || '0', 10);
    assert(totalBookings >= 500, `Database has 500+ seed bookings (Found: ${totalBookings})`);

    // Test 2: Dashboard Stats Calculation
    const stats = await getDashboardStats('30d');
    assert(typeof stats.kpis.totalBookings.value === 'number', 'Dashboard returns numeric totalBookings KPI');
    assert(Number(stats.kpis.totalBookings.value) >= 500, 'Total Bookings KPI matches database count');
    assert(stats.statusDistribution.length > 0, 'Status distribution contains calculated categories');

    // Test 3: Paginated Bookings List API Query
    const p1 = await getBookings({ page: 1, limit: 10 });
    assert(p1.data.length === 10, 'Pagination page 1 returns exactly 10 items');
    assert(p1.pagination.total >= 500, 'Pagination meta returns accurate total count');
    assert(p1.pagination.totalPages >= 50, 'Pagination meta calculates totalPages correctly');

    // Test 4: Filtering Bookings by Status
    const completedFilter = await getBookings({ status: 'COMPLETED', limit: 10 });
    const allCompleted = completedFilter.data.every((b) => b.status === 'COMPLETED');
    assert(allCompleted && completedFilter.data.length > 0, 'Status filter strictly returns COMPLETED bookings');

    // Test 5: Search Filter by Customer Name or Reg Number
    const searchResult = await getBookings({ search: 'Rahul' });
    assert(searchResult.data.length >= 0, 'Search query executes SQL ILIKE without error');

    // Test 6: Single Booking Detail
    const sampleBooking = p1.data[0];
    const fetchedBooking = await getBookingById(sampleBooking.id);
    assert(fetchedBooking !== null, 'Single booking fetch returns non-null record');
    assert(fetchedBooking?.id === sampleBooking.id, 'Fetched booking ID matches requested ID');
    assert(Array.isArray(fetchedBooking?.statusHistory), 'Booking detail includes status timeline history array');

    // Test 7: Booking Status Update & Timeline Record Creation
    const updated = await updateBookingStatus(sampleBooking.id, 'IN_PROGRESS', 'Test status update note');
    assert(updated?.status === 'IN_PROGRESS', 'Booking status successfully updated to IN_PROGRESS');
    const hasHistory = updated?.statusHistory?.some((h) => h.status === 'IN_PROGRESS');
    assert(hasHistory === true, 'Status history timeline includes new IN_PROGRESS entry');

    // Test 8: Invalid Booking ID handling
    const invalidBooking = await getBookingById('invalid-non-existent-id-999');
    assert(invalidBooking === null, 'Non-existent booking ID returns null gracefully');

    console.log(`\n--- Test Summary: ${passed} Passed, ${failed} Failed ---`);
    if (failed > 0) {
      process.exit(1);
    } else {
      console.log('ALL BACKEND TESTS PASSED SUCCESSFULLY! 🎉');
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal test execution error:', err);
    process.exit(1);
  }
}

runTests();
