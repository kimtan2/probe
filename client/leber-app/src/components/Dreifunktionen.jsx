import React from 'react';
import { Link } from 'react-router-dom';


export default function Dreifunktionen() {
    return (
        <>

            <div className="flex justify-center space-x-12">
                <Link to={"/einschleusen"}>
                    <button
                        class="select-none rounded-lg bg-gradient-to-tr from-blue-800 to-blue-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-blue-900"
                        type="button"
                    >
                        einschleusen
                    </button>

                </Link>


                <Link to={"/uebersicht"}>
                    <button
                        class="select-none rounded-lg bg-gradient-to-tr from-blue-800 to-blue-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-blue-900"
                        type="button"
                    >
                        ausschleusen
                    </button>
                </Link>



                <Link to={"/uebersicht"}>
                    <button
                        class="select-none rounded-lg bg-gradient-to-tr from-blue-800 to-blue-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-blue-900"
                        type="button"
                    >
                        wiedereinschleusen
                    </button>
                </Link>

            </div>
        </>
    )
}