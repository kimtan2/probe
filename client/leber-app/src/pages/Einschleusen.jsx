import React from "react";
import { useState, useEffect,  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Einschleusen({addNewItem, refreshAllData}) {
    const [newPatientData, setNewPatientData] = useState({
        Status: "e",
        PatientenNummer: "",
        Alter: "",
        Diagnose: ""
      });

    const navigate = useNavigate();
    
    function handleInput(event) {
        const { name, value } = event.target;
        const parsedValue = name === "Alter" || name === "PatientenNummer" ? parseInt(value) : value;

        setNewPatientData((prevValue) => {
            return {
                ...prevValue,
                [name]: parsedValue
            }
        })
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("newPatientData", newPatientData);
        addNewItem(newPatientData)
        refreshAllData();
        navigate("/uebersicht");
    }

    return (
        <div className="mt-16">

            <div className='left-0 mb-8'>
                <Link to={"/"}>

                    <button type="button" class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" >
                        <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Zurück</span>
                    </button>

                </Link>

            </div>


            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Patientennummer
                        </label>
                        <input onChange={handleInput} name="PatientenNummer" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Patientennummer" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Alter
                        </label>
                        <input onChange={handleInput} name="Alter" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="text" placeholder="Alter" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Diagnostik
                        </label>
                        <input onChange={handleInput} name="Diagnose" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="text" placeholder="Diagnostik" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        EINSCHLEUSEN
                    </button>
                </div>
            </form>
        </div>
    )
}
