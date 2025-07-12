const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// PostgreSQL only
const { Pool } = require('pg');

const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    // Test PostgreSQL connection
    await sql.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected successfully');
    
    // Create tables if they don't exist
    await createTables();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
};

const createTables = async () => {
  try {
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

    console.log('✅ Database tables ready');
  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
  }
};

module.exports = { sql, connectDB }; 