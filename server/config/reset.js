
import 'dotenv/config'
import { pool } from './database.js'

const resetDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior VARCHAR(50) NOT NULL,
        roof VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        price INTEGER NOT NULL
      );
    `)

    console.log('Cars table created successfully!')
  } catch (error) {
    console.error('Error creating cars table:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()
