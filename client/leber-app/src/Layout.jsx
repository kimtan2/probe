import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
            setCurrentPage(0);
        } else if (location.pathname === "/uebersicht") {
            setCurrentPage(1);
        } else {
            setCurrentPage(2); // Default page index for other paths
        }
    }, [location.pathname]);

    return (
        <>
            <div className=" bg-blue-700 p-4 rounded-md mb-4 shadow-2xl">
                <header className="text-white text-center text-2xl font-bold mb-4">
                    Datenbankmanagement
                </header>
                <nav className="flex justify-center space-x-4 mb-4">
                    <Link to="/" className={`text-white ${currentPage === 0 ? 'underline' : 'hover:underline'}`} >
                        Home
                    </Link>
                    <Link to="/uebersicht" className={`text-white ${currentPage === 1 ? 'underline' : 'hover:underline'}`} >
                        Übersicht
                    </Link>
                </nav>
            </div>

            <div className="px-4"> <Outlet /> </div>
        </>

    );
};

export default Layout;
