import React from 'react'
import Dashboard from './components/Dashboard'

const allKahoots = [
  { title: 'Car Logos', image: '/images/car.webp', author: 'Begzod Safarov', coverImage: '', },
  { title: 'Cool Cars', image: '/images/car.webp', author: 'John Doe', coverImage: '' },
]

const Discover = () => {
  return (
    <Dashboard title='Discover Kahoots' data={allKahoots}/>
  )
}

export default Discover