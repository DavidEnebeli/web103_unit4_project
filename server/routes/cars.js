
import express from 'express'

import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/cars.js'

const router = express.Router()

// GET all cars
router.get('/', getCars)

// GET a single car
router.get('/:id', getCar)

// POST create a new car
router.post('/', createCar)

// PUT update an existing car
router.patch('/:id', updateCar)

// DELETE a car
router.delete('/:id', deleteCar)

export default router
