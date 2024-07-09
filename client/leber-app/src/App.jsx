import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Layout from './Layout.jsx';
import Uebersicht from './pages/Uebersicht.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import Einschleusen from './pages/Einschleusen.jsx';


function App() {

  const [data, setData] = useState([]);
  const [statusChangeClicked, setStatusChangeClicked] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/home");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data has changed", data);
    fetchData();
  }, [statusChangeClicked]);



  function addNewItem(newPatientData) {
    console.log("newPatientData", newPatientData);
    axios.post("http://localhost:3001/home", newPatientData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function updateStatus(Status, id) {
    console.log("Update status function is called with the newStatus and id", Status, id)
    Status = typeof Status === "bigint" ? Status.toString() : Status;
    axios.put("http://localhost:3001/home", { Status, id })
      .then((response) => {
        console.log(response);
        refreshAllData();
      })
      .catch((error) => {
        console.log(error);
        refreshAllData();

      })
  }


  async function refreshAllData() {
    fetchData();


  }



  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/uebersicht" element={<Uebersicht data={data} refreshAllData={refreshAllData} updateStatus={updateStatus} />} />
          <Route path="/einschleusen" element={<Einschleusen addNewItem={addNewItem} refreshAllData={refreshAllData} />} />
        </Route>
      </Routes>
    </BrowserRouter >

  )

}

export default App
