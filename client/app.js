import React from 'react'
import { Navbar, Footer } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="main-app">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
