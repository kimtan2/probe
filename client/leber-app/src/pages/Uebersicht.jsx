import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Uebersicht({ data = [], refreshAllData, updateStatus }) {
    const [searchData, setSearchData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchZustand, setSearchZustand] = useState(false);
    const [tableKey, setTableKey] = useState(0);

    useEffect(() => {
        // Increment the key to trigger a re-render
        setTableKey(prev => prev + 1);
    }, [data]);


    // Function for displaying the current status
    function handleStatus(status) {
        if (status === "w" || status === "W") {
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">wiedereingeschleust</span>;
        } else if (status === "e" || status === "E") {
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">eingeschleust</span>;
        } else if (status === "a") {
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">ausgeschleust</span>;
        }
    }

    // Function to create JSX for the table data
    function handleDataToTable(dataForTable) {
        return dataForTable.map((item) => (
            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{item.id}</td>
                <td className="py-4">{handleStatus(item.Status)}</td>
                <td className="px-6 py-4 space-x-2">
                    {item.Status === "a" || item.Status === "A" ? (
                        <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 text-xs border border-blue-500 hover:border-transparent rounded" onClick={() => {updateStatus("w", item.id); setSearchData(0) }}>
                            WIEDER
                        </button>
                    ) : (
                        <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 text-xs border border-blue-500 hover:border-transparent rounded" onClick={() => {updateStatus("a", item.id); setSearchData(0)}}>
                            AUS
                        </button>
                    )}
                </td>
                <td className="px-6 py-4">{item.PatientenNummer}</td>
                <td className="px-6 py-4">{item.Alter}</td>
                <td className="px-6 py-4">{item.Diagnose}</td>
            </tr>
        ));
    }

    // Function to handle search
    function handleSearch(event) {
        
        event.preventDefault();

        const searchNumber = parseInt(searchValue, 10);

        const filteredData = data.filter((item) => parseInt(item.PatientenNummer, 10) === searchNumber);
        if (filteredData.length > 0) {
            setSearchData(filteredData);
            setSearchZustand(true);
        } else {
            setSearchData([]);
            alert("PatientIn mit dieser Patientennummer nicht gefunden");
            console.log("PatientIn mit dieser Patientennummer nicht gefunden", searchValue)
        }
    }

    // Function to update status and refresh data
    function handleUpdateStatus(newStatus, id) {
        // try to updateStatus and when its don erefresh data and search data
        updateStatus(newStatus, id);
        refreshAllData();
        refreshSearch();

            
    }

    // Function to refresh search results
    function refreshSearch() {
        const searchNumber = parseInt(searchValue, 10);
        const filteredData = data.filter((item) => parseInt(item.PatientenNummer, 10) === searchNumber);
        console.log("filteredData from the refresh Search", filteredData);
        if (filteredData.length > 0) {
            setSearchData(filteredData);
            setSearchZustand(true);
        } else {
            setSearchData([]);
            alert("PatientIn mit dieser Patientennummer nicht gefunden");
            console.log("PatientIn mit dieser Patientennummer nicht gefunden", searchValue);
        }
    }

    

    return (
        <>
            {/* Search Bar UI */}
            <form className="max-w-md mx-auto mt-12 mb-12" onSubmit={handleSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Patientennummer  eingeben..."
                        required
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Suchen
                    </button>
                </div>
            </form>

            {/* go back button */}
            {( searchZustand) && <div className='left-0 mb-8'>
                <button type="button" class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={() => {setSearchZustand(false); setSearchData(0); setSearchValue("")}}>
                    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Zurück</span>
                </button>
            </div>}




            {/* Table UI */}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded-md shadow-md">
                        <tr>
                            <th scope="col" className="px-6 py-3">id</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Aktion</th>
                            <th scope="col" className="px-6 py-3">Patientennummer</th>
                            <th scope="col" className="px-6 py-3">Alter</th>
                            <th scope="col" className="px-6 py-3">Diagnose</th>
                        </tr>
                    </thead>
                    <tbody key={tableKey}>
                        {searchData.length > 0 ? handleDataToTable(searchData) : handleDataToTable(data)}
                    </tbody>
                </table>
            </div>
        </>
    );
}
