import React, { useEffect, useRef } from 'react';
import Mission1 from '../asset/Mission1.jpg';
import Mission2 from '../asset/Misi2.jpg';
import Mission3 from '../asset/lapar.jpeg';
import Iconlist from '../asset/iconlist.svg';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Mission = () => {
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef(null);
    const listRef = useRef(null);

    const checkVisibility = (ref, className) => {
        const triggerBottom = window.innerHeight / 5 * 4;
        const elementTop = ref.current.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            ref.current.classList.add(className);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (titleRef.current) {
                checkVisibility(titleRef, 'show');
            }
            if (textRef.current) {
                checkVisibility(textRef, 'show');
            }
            if (imagesRef.current) {
                checkVisibility(imagesRef, 'show');
            }
            if (listRef.current) {
                checkVisibility(listRef, 'show');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id='mission' className="text-black box-border px-4 md:px-8 lg:px-16 py-8 mission">
            <div ref={titleRef} className="flex justify-center font-semibold text-3xl mb-8 md:mb-12 lg:mb-16 boxup ">
                <h1>Misi Kita</h1>
            </div>
            <div ref={textRef} className="flex flex-col items-center mx-6 md:mx-12 lg:mx-20 boxup">
                <p className="text-base md:text-lg lg:text-xl w-full px-5 py-2">
                    Kami berkomitmen untuk bekerja tanpa lelah demi dunia yang bebas dari kelaparan, di mana setiap orang memiliki akses ke makanan yang cukup dan bergizi. Bersama-sama, kita bisa membuat perbedaan yang nyata.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <div ref={imagesRef} className="flex flex-wrap justify-center gap-5 p-5 boxl">
                    <img src={Mission2} alt="Mission2" className="w-full lg:w-auto max-w-md lg:max-w-lg" />
                    <img src={Mission3} alt="Mission2" className="w-full lg:w-auto max-w-md lg:max-w-lg" />
                    <img src={Mission1} alt="Mission1" className="w-full lg:w-auto max-w-md lg:max-w-lg" />
                </div>
            
                <ul ref={listRef} className="space-y-2 font-semibold mt-5 lg:mt-0 lg:pl-10 boxr mb-5">
                <p className="font-semibold text-center text-2xl">Mission</p>
                    <li className="flex items-center">
                        <img src={Iconlist} alt="icon" className="w-6 h-6 mr-2" />
                        <span>Mengoptimalkan penggunaan surplus pangan dengan mengumpulkan dan mendistribusikannya ke daerah yang membutuhkan.</span>
                    </li>
                    <li className="flex items-center">
                        <img src={Iconlist} alt="icon" className="w-6 h-6 mr-2" />
                        <span>Menciptakan sistem distribusi yang efektif untuk menjamin bahwa setiap orang memiliki akses ke makanan bergizi.</span>
                    </li>
                    <li className="flex items-center">
                        <img src={Iconlist} alt="icon" className="w-6 h-6 mr-2" />
                        <span>Terus mencari solusi baru dan lebih baik untuk mengatasi kelaparan dan memastikan ketersediaan pangan bagi generasi mendatang.</span>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Mission;
