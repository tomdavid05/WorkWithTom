const dotenv = require('dotenv');
const { sql } = require('./db');

// Load environment variables
dotenv.config({ path: './config.env' });

async function testConnection() {
  try {
    console.log('🔍 Testing PostgreSQL connection...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    // Test connection
    const result = await sql.query('SELECT NOW() as current_time, version() as version');
    console.log('✅ PostgreSQL connected successfully!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('PostgreSQL Version:', result.rows[0].version);
    
    // Test tables
    const tablesResult = await sql.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('✅ Available tables:', tablesResult.rows.map(row => row.table_name));
    
    await sql.end();
    console.log('✅ Connection closed successfully');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if DATABASE_URL is set in config.env');
    console.log('2. Verify PostgreSQL connection string');
    console.log('3. Check if database exists');
    console.log('4. Verify network connectivity');
  }
}

testConnection(); 