
import { pool } from '../config/database.js'

// Get all customized cars
export const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM cars ORDER BY id DESC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get one customized car
export const getCar = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM cars WHERE id = $1',
      [req.params.id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a customized car
export const createCar = async (req, res) => {
  try {
    const { name, exterior, roof, wheels, interior, price } = req.body

    const results = await pool.query(
      `INSERT INTO cars (name, exterior, roof, wheels, interior, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, exterior, roof, wheels, interior, price]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a customized car
export const updateCar = async (req, res) => {
  try {
    const { name, exterior, roof, wheels, interior, price } = req.body

    const results = await pool.query(
      `UPDATE cars
       SET name = $1, exterior = $2, roof = $3,
           wheels = $4, interior = $5, price = $6
       WHERE id = $7
       RETURNING *`,
      [name, exterior, roof, wheels, interior, price, req.params.id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a customized car
export const deleteCar = async (req, res) => {
  try {
    const results = await pool.query(
      'DELETE FROM cars WHERE id = $1 RETURNING *',
      [req.params.id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
