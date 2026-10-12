
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI.js'
import '../App.css'

const CreateCar = () => {
  const navigate = useNavigate()

  const [car, setCar] = useState({
    name: '',
    exterior: 'Black',
    roof: 'Standard',
    wheels: 'Standard',
    interior: 'Black'
  })

  const [error, setError] = useState('')

  const prices = {
    exterior: {
      Black: 0,
      Red: 500,
      Blue: 400,
      White: 300
    },
    roof: {
      Standard: 0,
      Panoramic: 1500,
      Carbon: 2500
    },
    wheels: {
      Standard: 0,
      Sport: 1200,
      Premium: 2000
    },
    interior: {
      Black: 0,
      Tan: 800,
      Red: 1200
    }
  }

  const totalPrice =
    45000 +
    prices.exterior[car.exterior] +
    prices.roof[car.roof] +
    prices.wheels[car.wheels] +
    prices.interior[car.interior]

  const handleChange = (event) => {
    const { name, value } = event.target

    setCar((previous) => ({
      ...previous,
      [name]: value
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!car.name.trim()) {
      setError('Please enter a name for your car.')
      return
    }

    if (car.roof === 'Carbon' && car.interior === 'Tan') {
      setError('Carbon roof cannot be combined with Tan interior.')
      return
    }

    try {
      await createCar({
        ...car,
        price: totalPrice
      })

      navigate('/customcars')
    } catch (error) {
      setError('Unable to save car. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="create-car">
      <h1>Customize Your Dream Car</h1>
      <p>Choose your favorite features and build your car.</p>

      <form onSubmit={handleSubmit}>
        <label>Car Name</label>
        <input
          type="text"
          name="name"
          value={car.name}
          onChange={handleChange}
          placeholder="Enter your car name"
          required
        />

        <label>Exterior Color</label>
        <select
          name="exterior"
          value={car.exterior}
          onChange={handleChange}
        >
          {Object.keys(prices.exterior).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Roof</label>
        <select
          name="roof"
          value={car.roof}
          onChange={handleChange}
        >
          {Object.keys(prices.roof).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Wheels</label>
        <select
          name="wheels"
          value={car.wheels}
          onChange={handleChange}
        >
          {Object.keys(prices.wheels).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Interior</label>
        <select
          name="interior"
          value={car.interior}
          onChange={handleChange}
        >
          {Object.keys(prices.interior).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="car-preview">
          <h2>Exterior Preview</h2>
          <div
            style={{
              backgroundColor: car.exterior.toLowerCase(),
              width: '220px',
              height: '100px',
              borderRadius: '18px',
              border: '3px solid #888',
              margin: '20px auto'
            }}
          />
          <p>Selected Color: {car.exterior}</p>
        </div>

        <h2>Total Price: ${totalPrice.toLocaleString()}</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Save Car</button>
      </form>
    </div>
  )
}

export default CreateCar
