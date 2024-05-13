import React, { useState, useEffect } from 'react';
import logo from "../asset/Logo.svg";
import { navLink } from "../data/dummy";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('home'); // Default active item
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Update the active item based on the current path
        const currentPath = location.pathname.replace('/', '');
        setActiveItem(currentPath);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
    };

    const handleNavigate = (path, itemId) => {
        // Perform navigation first
        navigate(path);
        // Then set active item in next tick to ensure re-render happens after navigation
        setTimeout(() => {
            setActiveItem(itemId);
        }, 0);
    };

    return (
        <div className="text-black fixed top-0 left-0 w-full bg-white z-50">
            <div className="container mx-auto flex items-center justify-between px-8 md:px-[140px] shadow-md sticky top-0 bg-white">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="h-8 sm:h-10 md:h-12" />
                </div>
                <div className="hidden md:flex items-center justify-end relative">
                    <ul className="flex space-x-8">
                        {navLink.map((item) => (
                            <li key={item.id} className={`relative ${activeItem === item.id ? 'text-gray-700' : 'text-gray-500'}`}>
                                <button
                                    onClick={() => handleNavigate(`/${item.id}`, item.id)}
                                    className="hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"  // Custom focus style
                                >
                                    {item.name}
                                </button>
                                {activeItem === item.id && (
                                    <div className="absolute w-full h-1 bg-white bottom-0 left-0 transition-all duration-300 ease-in-out"></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:hidden">
                    <IoMenuOutline className="text-3xl" onClick={toggleMobileMenu} />
                </div>
            </div>

            <div className={`md:hidden fixed top-[32px] left-0 w-full bg-white transition-all duration-300 ease-in-out ${isMobileMenuVisible ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                <ul className="flex flex-col items-center">
                    {navLink.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavigate(`/${item.id}`, item.id)}
                                className="block w-full text-left py-2 px-4 hover:bg-gray-700 cursor-pointer focus:outline-none focus:bg-red-800"  // Maintain focus style for accessibility
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
