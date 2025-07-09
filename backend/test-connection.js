const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function testConnection() {
  try {
    console.log('🔍 Testing SQL Server connection...');
    console.log('Server:', config.server);
    console.log('Database:', config.database);
    console.log('User:', config.user || 'Windows Authentication');
    
    await sql.connect(config);
    console.log('✅ SQL Server connected successfully!');
    
    // Test a simple query
    const result = await sql.query('SELECT @@VERSION as version');
    console.log('✅ Query test successful');
    console.log('SQL Server Version:', result.recordset[0].version);
    
    await sql.close();
    console.log('✅ Connection closed successfully');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if SQL Server is running');
    console.log('2. Verify server name: DAVIDTOM\\SQLEXPRESS');
    console.log('3. Check if database "todo_db" exists');
    console.log('4. Verify username and password');
    console.log('5. Try Windows Authentication (empty user/password)');
  }
}

testConnection(); 