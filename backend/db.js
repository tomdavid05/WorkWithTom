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
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('✅ SQL Server connected successfully');
    
    // Create tables if they don't exist
    await createTables();
  } catch (err) {
    console.error('❌ SQL Server connection failed:', err.message);
    process.exit(1);
  }
};

const createTables = async () => {
  try {
    // Create users table
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
      CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) UNIQUE NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
      )
    `);

    // Create tasks table
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='tasks' AND xtype='U')
      CREATE TABLE tasks (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        title NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        completed BIT DEFAULT 0,
        priority NVARCHAR(20) DEFAULT 'medium',
        due_date DATETIME,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables ready');
  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
  }
};

module.exports = { sql, connectDB }; 