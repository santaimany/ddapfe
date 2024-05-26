import React, { useEffect, useRef } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Slider from "react-slick";
import nextArrow from "../asset/nextArrow.svg";
import prevArrow from "../asset/prevArrow.svg";
import Aboutus1 from "../asset/aboutus1.jpg";
import Aboutus2 from "../asset/aboutus2.jpg";
import Aboutus3 from "../asset/aboutus3.png";
import Graine from "../asset/team/Graine.jpg";
import Santa from "../asset/team/Santa.jpg";
import Maulidya from "../asset/team/Maulidya.jpg";
import Hilmy from "../asset/team/hilmy.jpeg";
import Zaidan from "../asset/team/Zaidanjpg.jpg";
import bgVideo from "../asset/video/WhatsApp Video 2024-05-26 at 13.02.48_8200dd38.mp4";
import { useMediaQuery } from 'react-responsive';

const teamMembers = [
    { name: "Maulidya Itikaf", role: "Project Manager", image: Maulidya, description: "Sometimes the simplest things are the hardest to find. So we created a new line for everyday life, all year round." },
    { name: "Graine Ivana", role: "UI/UX Analyst", image: Graine, description: "Sometimes the simplest things are the hardest to find. So we created a new line for everyday life, all year round." },
    { name: "M. Zaidan Azizi", role: "UI/UX Designer", image: Zaidan, description: "Sometimes the simplest things are the hardest to find. So we created a new line for everyday life, all year round." },
    { name: "Hilmy Raihan", role: "Back End Developer", image: Hilmy, description: "Sometimes the simplest things are the hardest to find. So we created a new line for everyday life, all year round." },
    { name: "Ahsanta Khalqi Imany", role: "Front End Developer", image: Santa, description: "Sometimes the simplest things are the hardest to find. So we created a new line for everyday life, all year round." }
];

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next-arrow`}
            style={{ ...style, display: 'block', right: '25px', zIndex: '10' }}
            onClick={onClick}
        >
            <img src={nextArrow} alt="Next" style={{ height: '24px', width: '24px' }} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev-arrow`}
            style={{ display: 'block', left: '25px', zIndex: '10' }}
            onClick={onClick}
        >
            <img src={prevArrow} alt="Previous" style={{ height: '24px', width: '24px' }} />
        </div>
    );
}

const AboutUs = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const settingsTeam = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1700,
        cssEase: "ease-out",
        fade: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="bg-light-blue text-gray-600 body-font overflow-x-hidden">
            <Navbar />
            <div className="container mx-auto fade-in bg-red-600">
                <div className="w-full overflow-hidden overflow-y-hidden">
                    <video autoPlay muted loop className="w-full h-full md:h-[100vh] object-cover">
                        <source src={bgVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className="bg-[]">
                <div className="max-w-[100%] text-center p-[20px] flex justify-center">
                    <h1 ref={titleRef} className="mb-[10px] mt-10 font-bold text-2xl boxup">About us</h1>
                </div>
                <div ref={textRef} className="mb-12 max-w-7xl mx-auto p-4 flex justify-center items-center boxr pb-32">
                    <p className="text-center px-4 md:px-8 lg:px-0">ThriveTerra adalah website yang bergerak dalam mengatasi kelaparan global (zero hunger). Kami fokus pada pengumpulan data dan pendistribusian surplus pangan ke daerah-daerah yang membutuhkan. Bersama ThriveTerra, mari wujudkan dunia di mana tidak ada yang kelaparan dan makanan dapat diakses oleh semua orang. Bergabunglah dengan kami untuk membuat perubahan nyata, satu langkah setiap harinya. </p>
                </div>
            </div>

            <div className="mb-20 mt-auto">
                <div className="font-bold text-4xl flex text-center justify-center mb-20">
                    <h1>Meet Our Team</h1>
                </div>
                <Slider {...settingsTeam}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="p-4">
                            <div className="h-full flex flex-col items-center text-center">
                                <img src={member.image} alt={member.name} className="w-48 h-48 mb-3 object-cover object-center rounded-full" />
                                <h2 className="text-lg font-medium">{member.name}</h2>
                                <h3 className="text-blue-500">{member.role}</h3>
                                <p className="text-sm">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
