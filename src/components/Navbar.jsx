import React, { useState, useEffect } from 'react';
import logo from "../asset/logo/ThriveTerra_Logo-removebg-preview.png";
import { navLink } from "../data/dummy";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('home'); // Default active item
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false); // New state to handle animation visibility
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        window.location.href ='http://localhost/ddapkelompok4/user/login'
    };

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

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Show the navbar with animation after component mounts
        setIsNavbarVisible(true);
    }, []);
    const handleRegister = () => {
        window.location.href = 'http://localhost/ddapkelompok4/user/register';
    };

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} ${isNavbarVisible ? 'navbar-drop-down' : ''}`}>
            <div className="container mx-auto flex items-center justify-between px-8 md:px-[140px]">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="h-14 sm:h-20 md:h-20" />
                </div>
                <div className="hidden md:flex items-center justify-end relative flex-1">
                    <ul className="flex space-x-8">
                        {navLink.map((item) => (
                            <li key={item.id} className={`relative ${activeItem === item.id ? 'font-semibold' : 'text-black'}`}>
                                <button
                                    onClick={() => handleNavigate(`/${item.id}`, item.id)}
                                    className="hover:text-gray-700 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    {item.name}
                                </button>
                                {activeItem === item.id && (
                                    <div className="absolute w-full h-1 bg-[#00b4d8] top-7 rounded-full bottom-0 left-0 transition-all duration-300 ease-in-out"></div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleLoginClick}
                        className='bg-amber-50 text-black ml-8 px-8 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors outline outline-1'>
                        Login
                    </button>
                    <button
                        onClick={handleRegister}
                        className='bg-black text-white ml-1 px-6 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors hover:outline outline-1'>
                        Register
                    </button>
                </div>

                <div className="md:hidden">
                    <IoMenuOutline className="text-3xl" onClick={toggleMobileMenu} />
                </div>
            </div>

            <div className={`md:hidden fixed top-[32px] left-0 w-full bg-white transition-all duration-300 ease-in-out ${isMobileMenuVisible ? "max-h-screen text-black" : "max-h-0 overflow-hidden"}`}>
                <ul className="flex flex-col items-center">
                    {navLink.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavigate(`/${item.id}`, item.id)}
                                className="block w-full text-left py-2 px-4 hover:bg-gray-700 cursor-pointer focus:outline-none focus:bg-red-800"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleLoginClick}
                            className='bg-amber-50 text-black mt-2 mb-6 px-8 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors md:outline md:outline-1'>
                            Login
                        </button>
                        <button
                            onClick={handleLoginClick}
                            className='bg-black text-white mt-2 px-6 py-2  rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors md:outline md:outline-1'>
                            Register
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
