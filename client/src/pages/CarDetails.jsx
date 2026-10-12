
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCar } from '../services/CarsAPI.js'
import '../App.css'

const CarDetails = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id)
        setCar(data)
      } catch (error) {
        console.error(error)
        setError('Unable to load car details.')
      }
    }

    fetchCar()
  }, [id])

  if (error) {
    return <div className="create-car"><p>{error}</p></div>
  }

  if (!car) {
    return <div className="create-car"><p>Loading car...</p></div>
  }

  return (
    <div className="create-car">
      <h1>{car.name}</h1>
      <h2>Car Details</h2>

      <div className="car-card">
        <p>Exterior: {car.exterior}</p>
        <p>Roof: {car.roof}</p>
        <p>Wheels: {car.wheels}</p>
        <p>Interior: {car.interior}</p>

        <div className="car-preview">
          <h2>Exterior Color Preview</h2>
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
        </div>

        <h2>Price: ${Number(car.price).toLocaleString()}</h2>

        <div className="car-actions">
        <Link to={`/edit/${car.id}`}>
            <button>Edit Car</button>
          </Link>

          <Link to="/customcars">
            <button>Back to Cars</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
