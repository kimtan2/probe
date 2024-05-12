import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';

function App() {


  return (

    <BrowserRouter>
      <div>
        <header>
          <Link to="/home"> Home (mit Daten aus der Tabelle Probe) </Link>
          <Link> Daten aus den Probe-SQL-Dateien </Link>
        </header>


        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>

  )

}

export default App
