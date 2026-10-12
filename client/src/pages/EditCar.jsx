
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState({
    name: '',
    exterior: 'Red',
    roof: 'Standard',
    wheels: 'Standard',
    interior: 'Black'
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`)
        if (!response.ok) throw new Error('Failed to load car')

        const data = await response.json()
        setCar(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCar(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: car.name,
            exterior: car.exterior,
            roof: car.roof,
            wheels: car.wheels,
            interior: car.interior,
            price: car.price
          })
      })

      if (!response.ok) throw new Error('Failed to update car')

      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <main><h2>Loading car...</h2></main>

  return (
    <main className="edit-car-page">
      <h1>Edit Your Custom Car</h1>
      <p>Update your favorite features below.</p>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit} className="car-form">
        <label htmlFor="name">Car Name</label>
        <input
          id="name"
          name="name"
          value={car.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="exterior">Exterior Color</label>
        <select id="exterior" name="exterior"
          value={car.exterior} onChange={handleChange}>
          {['Red', 'Black', 'White', 'Blue', 'Silver'].map(color =>
            <option key={color} value={color}>{color}</option>
          )}
        </select>

        <label htmlFor="roof">Roof</label>
        <select id="roof" name="roof"
          value={car.roof} onChange={handleChange}>
          {['Standard', 'Sunroof', 'Panoramic'].map(option =>
            <option key={option} value={option}>{option}</option>
          )}
        </select>

        <label htmlFor="wheels">Wheels</label>
        <select id="wheels" name="wheels"
          value={car.wheels} onChange={handleChange}>
          {['Standard', 'Sport', 'Premium'].map(option =>
            <option key={option} value={option}>{option}</option>
          )}
        </select>

        <label htmlFor="interior">Interior</label>
        <select id="interior" name="interior"
          value={car.interior} onChange={handleChange}>
          {['Black', 'Red', 'Tan', 'White'].map(color =>
            <option key={color} value={color}>{color}</option>
          )}
        </select>

        <button type="submit">SAVE CHANGES</button>
      </form>
    </main>
  )
}

export default EditCar
