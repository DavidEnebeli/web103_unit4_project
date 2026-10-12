
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI.js'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars()
        setCars(data)
      } catch (error) {
        console.error(error)
        setError('Unable to load cars.')
      }
    }

    fetchCars()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this car?'
    )

    if (!confirmed) return

    try {
      await deleteCar(id)
      setCars((previous) =>
        previous.filter((car) => car.id !== id)
      )
    } catch (error) {
      console.error(error)
      setError('Unable to delete car.')
    }
  }

  return (
    <div className="create-car">
      <h1>Your Custom Cars</h1>
      <p>View, edit, or delete your customized cars.</p>

      {error && <p>{error}</p>}

      {cars.length === 0 ? (
        <p>No cars created yet.</p>
      ) : (
        <div className="cars-list">
          {cars.map((car) => (
            <div className="car-card" key={car.id}>
              <h2>{car.name}</h2>

              <p>Exterior: {car.exterior}</p>
              <p>Roof: {car.roof}</p>
              <p>Wheels: {car.wheels}</p>
              <p>Interior: {car.interior}</p>

              <h3>
                Price: ${Number(car.price).toLocaleString()}
              </h3>

              <div className="car-actions">
              <Link to={`/customcars/${car.id}`}>
                  <button>View Details</button>
                </Link>

                <Link to={`/edit/${car.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(car.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewCars
