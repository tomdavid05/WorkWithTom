const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

let sql;
let isPostgreSQL = false;

// Check if using PostgreSQL or SQL Server
if (process.env.DATABASE_URL) {
  // PostgreSQL
  const { Pool } = require('pg');
  sql = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  isPostgreSQL = true;
} else {
  // SQL Server
  sql = require('mssql');
}

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
    if (isPostgreSQL) {
      // Test PostgreSQL connection
      await sql.query('SELECT NOW()');
      console.log('✅ PostgreSQL connected successfully');
    } else {
      // SQL Server connection
      await sql.connect(config);
      console.log('✅ SQL Server connected successfully');
    }
    
    // Create tables if they don't exist
    await createTables();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
};

const createTables = async () => {
  try {
    if (isPostgreSQL) {
      // PostgreSQL tables
      await sql.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT FALSE,
          priority VARCHAR(20) DEFAULT 'medium',
          due_date TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
    } else {
      // SQL Server tables
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
    }

    console.log('✅ Database tables ready');
  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
  }
};

module.exports = { sql, connectDB, isPostgreSQL }; 