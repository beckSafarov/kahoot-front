import React from 'react'
import Dashboard from './components/Dashboard'

const myKahoots = [
  { title: 'Car Logos', image: '/images/car.webp'},
  { title: 'Cool Cars', image: '/images/car.webp'},
]
const Home = () => {
  return (
    <Dashboard data={myKahoots} title='My Kahoots'/>
  )
}

export default Home
