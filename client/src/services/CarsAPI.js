
const API_URL = '/api/cars'

// Get all cars
export const getAllCars = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch cars')
  return response.json()
}

// Get one car
export const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch car')
  return response.json()
}

// Create a car
export const createCar = async (car) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })

  if (!response.ok) throw new Error('Failed to create car')
  return response.json()
}

// Update a car
export const updateCar = async (id, carData) => {
    const response = await fetch(`/api/cars/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carData)
    })
  
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Update failed:', response.status, errorText)
      throw new Error(`Failed to update car: ${response.status}`)
    }
  
    return response.json()
  }

// Delete a car
export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) throw new Error('Failed to delete car')
  return response.json()
}
