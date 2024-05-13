import React, {useEffect, useRef, useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Mission from "./Mission";
import programbgimg from "../asset/program-bg-top.jpg";
import Program1 from "../asset/program1.jpg";
import Program2 from "../asset/program2.jpg";
import Program3 from  "../asset/program3.jpg";
import Program4 from "../asset/program4.jpg";
import Videobg from '../asset/video/Y2meta.app-2018 Road to Zero Hunger Campaign in Indonesia-(1080p).mp4';


const Program = () => {

    const handleRegisterClick = () => {
        window.location.href = 'http://localhost/ddapkelompok4/user/register';
    }

    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef(null);
    const listRef = useRef(null);
    const testRef = useRef(null)
    const videoRef = useRef(null);
    const [showText, setShowText] = useState(false);


    useEffect(() => {
        const video = videoRef.current;
        const checkTime = () => {
            if (video.currentTime >= 21 && video.currentTime < 184) {
                setShowText(true);
            } else {
                setShowText(false);
            }
        };

        video.addEventListener('timeupdate', checkTime);

        return () => {
            video.removeEventListener('timeupdate', checkTime);
        };
    }, []);

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
            if (testRef.current) {
                checkVisibility(testRef, 'show');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
                <section className="relative bg-gray-200 text-center py-20 px-4 overflow-hidden h-screen">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <video ref={videoRef} autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                            <source src={Videobg} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {showText && (
                            <div ref={imagesRef} className="bg-white bg-opacity-0 text-white p-8 inline-block  z-10 " style={{ bottom: '20%' }}>
                                <h1 className="text-3xl font-bold">Kenapa kami ada?</h1>
                                <p className="max-w-xl mx-auto">Kenal lebih dalam, bersama program kami.</p>
                            </div>
                        )}
                    </div>
                </section>



                <Mission/>
                <section className="py-20 px-4">
                    <h2 className="text-2xl font-bold text-center mb-10">Program Kita</h2>

                    <div className="max-w-4xl mx-auto">
                        {/* 2017 Milestone */}
                        <div ref={testRef} className="flex flex-col md:flex-row items-center mb-10 md:mb-20 text-center md:text-left boxr ">
                            <div className="md:flex-1 mb-4 md:mb-0">
                                <div className="md:w-56 md:h-56 w-40 h-40 bg-green-300 rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2  ">
                                   <img src={Program1} className="md:w-56 md:h-56 w-40 h-40  rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2  "/>
                                </div>
                            </div>
                            <div className="md:flex-1">
                                <div className="p-6 bg-[#ade8f4] rounded-lg shadow-lg">
                                    <h3 className="text-lg font-bold mb-2">2017</h3>
                                    <p className="text-gray-700 text-sm">
                                        ThriveTerra adalah web yang berisikan tentang lorem ipsum dolor sit amet consectetur. Pulvinar arcu mattis in at sodales condimentum. Gravida arcu aliquet rutrum erat varius. Tellus felis sed pretium in egestas.
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* 2018 Milestone */}
                        <div ref={listRef} className="flex flex-col md:flex-row items-center mb-10 md:mb-20 text-center md:text-left boxr">
                            <div className="md:flex-1 mb-4 md:mb-0 order-1 md:order-none">
                                <div className="p-6 bg-[#03045e] text-white rounded-lg shadow-lg">
                                    <h3 className="text-lg font-bold mb-2">2018</h3>
                                    <p className="text-sm">
                                        ThriveTerra adalah web yang berisikan tentang lorem ipsum dolor sit amet consectetur. Pulvinar arcu mattis in at sodales condimentum. Gravida arcu aliquet rutrum erat varius. Tellus felis sed pretium in egestas.
                                    </p>
                                </div>
                            </div>
                            <div  className="md:flex-1 order-2 md:order-none">
                                <div className="md:w-56 md:h-56 w-40 h-40 rounded-full mx-auto mb-4 md:mb-0 md:ml-1/2">
                                    <img src={Program2} className="inline md:w-56 md:h-56 w-40 h-40  rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2  "/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* 2019 Milestone */}
                        <div ref={titleRef} className="flex flex-col md:flex-row items-center mb-10 md:mb-20 text-center md:text-left boxr">
                            <div className="md:flex-1 mb-4 md:mb-0">
                                <div className="md:w-56 md:h-56 w-40 h-40  rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2">
                                    <img src={Program3} className="inline md:w-56 md:h-56 w-40 h-40  rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2  "/>
                                </div>
                            </div>
                            <div className="md:flex-1">
                                <div className="p-6 bg-[#ade8f4] rounded-lg shadow-lg">
                                    <h3 className="text-lg font-bold mb-2">2019</h3>
                                    <p className="text-gray-700 text-sm">
                                        ThriveTerra adalah web yang berisikan tentang lorem ipsum dolor sit amet consectetur. Pulvinar arcu mattis in at sodales condimentum. Gravida arcu aliquet rutrum erat varius. Tellus felis sed pretium in egestas.
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* 2020 Milestone */}
                        <div ref={textRef} className="flex flex-col md:flex-row items-center mb-10 md:mb-20 text-center md:text-left boxr">
                            <div className="md:flex-1 mb-4 md:mb-0 order-1 md:order-none">
                                <div className="p-6 bg-[#03045e] text-white rounded-lg shadow-lg">
                                    <h3 className="text-lg font-bold mb-2">2020</h3>
                                    <p className=" text-sm">
                                        ThriveTerra adalah web yang berisikan tentang lorem ipsum dolor sit amet consectetur. Pulvinar arcu mattis in at sodales condimentum. Gravida arcu aliquet rutrum erat varius. Tellus felis sed pretium in egestas.
                                    </p>
                                </div>
                            </div>
                            <div className="md:flex-1 order-2 md:order-none">
                                <div className="md:w-56 md:h-56 w-40 h-40 bg-orange-300 rounded-full mx-auto mb-4 md:mb-0 md:ml-1/2">
                                    <img src={Program4} className="inline md:w-56 md:h-56 w-40 h-40  rounded-full mx-auto mb-4 md:mb-0 md:mr-1/2  "/>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <section className="bg-gray-200 text-center py-20 px-4">
                    <h2 className="text-3xl font-bold mb-2">Anda perwakilan desa?</h2>
                    <button onClick={handleRegisterClick} className="bg-black text-white px-10 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors outline outline-1">
                        Daftar
                    </button>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Program;
