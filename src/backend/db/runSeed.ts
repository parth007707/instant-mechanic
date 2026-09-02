import { getDb } from './index.js';

async function main() {
  console.log('Initializing Instant Mechanic PostgreSQL Database and Seeding...');
  await getDb();
  console.log('Database initialization & seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
