import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Homeimg from '../asset/pmr-bg-slide.jpg';
import Datagizi from './Datagizi';
import Support from './Support';
import Blog from './Blog';
import Faq from './FAQ';
import Footer from './Footer';
import Navbar from './Navbar';
import Wavebg from '../asset/wave/wave2.svg';
import  Blog6 from '../asset/blog/blog6.jpg';
import Blog7 from '../asset/blog/blog7.jpg';
import Blog9 from '../asset/blog/blog9.jpg';
import Blog10 from '../asset/blog/blog10.jpg';

const homeBlogData = [
    {
        url: "/blogs",
        title: "Kenali Food Waste dan Food Loss Penyebab Pemborosan Pangan!",
        description: "Memahami perbedaan antara food waste dan food loss serta dampaknya terhadap pemborosan pangan di Indonesia....",
        image: Blog7
    },
    {
        url: "/path-to-blog-2",
        title: "Inisiatif Pengurangan Food Loss dalam Rantai Pasokan",
        description: "Bergabung dengan kami dalam mengurangi food loss melalui teknologi inovatif...",
        image: Blog9
    },
    {
        url: "/path-to-blog-3",
        title: "Teknologi untuk Efisiensi Distribusi Pangan",
        description: "Memanfaatkan teknologi untuk meningkatkan efisiensi dan mengurangi pemborosan...",
        image: Blog10
    }
];


const Home = () => {
    const boxRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const handleTinjauClick = () => {
        window.location.href = 'http://localhost:3000/blog';
    };
    const handleRegister = () => {
        window.location.href = 'http://localhost/ddapkelompok4/user/register';
    };




    useEffect(() => {
        const checkBoxes = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;
            const box = boxRef.current;
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < triggerBottom) box.classList.add('show');
            else box.classList.remove('show');

            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else if (window.innerWidth <= 1366) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('scroll', checkBoxes);
        checkBoxes();

        return () => {
            window.removeEventListener('scroll', checkBoxes);
        };
    }, [boxRef]);

    const navigate = useNavigate();

    const gotoPageProgram = () => {
        navigate('/program');
    };

    return (
        <div>
            <Navbar />
            <div className="fixed inset-0 -z-10 ">
                <div className="absolute inset-y-0 -left-[510px] w-full h-full bg-no-repeat bg-left bg-contain transform rotate-[270deg]" style={{ backgroundImage: `url(${Wavebg})` }}></div>
            </div>
            <div className="relative z-0">

                <div
                    id='home'
                    className="flex justify-center items-center h-screen p-5 pr-5 md:pr-10 lg:pr-[150px] box-border"
                    style={{
                        backgroundImage: `url(${Homeimg})`,
                        backgroundSize: isMobile ? 'cover' : '100% 100%',
                        backgroundPosition: 'center'
                    }}
                >
                    <img src={Wavebg} className='absolute rotate-[270deg] -top-72 -left-[500px] '/>
                    <div className="flex flex-col md:flex-row w-full max-w-6xl py-[160px] px-10 mr-3">

                        <div ref={boxRef} className="flex-1 boxr w-full bg-transparent container mx-auto p-4 mb-6 md:mb-0 md:mr-4  rounded-lg  ">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-4">
                                <span className={`${isMobile ? 'text-black' : 'text-gray-100'} `}>Sem</span>ua Layak Untuk <span className={`${isMobile ? 'text-black' : 'text-gray-100'} `}>Hidu</span>p Dengan <span className={`${isMobile ? 'text-black' : 'text-gray-100'} `}>Tena</span>ng
                            </h1>
                            <p className="mb-4 font-light ">
                                <span className={`${isMobile ? 'text-black' : 'text-gray-100'} `}>Dengan upaya</span> ini, bersama kita menuntaskan kelaparan
                            </p><br />
                            <div className="flex flex-col sm:flex-row">
                                <button
                                    onClick={gotoPageProgram}
                                    className="bg-amber-50 max-w-[300px] max-h-[60px] px-9 py-2 rounded-[20px] hover:bg-[#CAF0F8] sm:mb-4 hover:text-black outline outline-1 text-[14px] font-semibold mb-4 sm:mb-0 sm:mr-3 flex items-center"
                                >
                                    Pelajari Lebih Lanjut
                                    <svg className="ml-2" width="11" height="12" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.7136 20.7538L20.2553 12.2121C20.4108 12.0496 20.5327 11.858 20.614 11.6483C20.7849 11.2324 20.7849 10.7659 20.614 10.35C20.5327 10.1403 20.4108 9.94873 20.2553 9.78626L11.7136 1.24459C11.5543 1.08531 11.3652 0.958962 11.1571 0.872759C10.949 0.786556 10.726 0.742187 10.5007 0.742187C10.0458 0.742187 9.60947 0.922909 9.28779 1.24459C8.9661 1.56628 8.78538 2.00258 8.78538 2.45751C8.78538 2.91244 8.9661 3.34874 9.28779 3.67043L14.9253 9.29085L1.95904 9.29085C1.50596 9.29085 1.07144 9.47083 0.751064 9.7912C0.430689 10.1116 0.250706 10.5461 0.250706 10.9992C0.250706 11.4523 0.430689 11.8868 0.751064 12.2072C1.07144 12.5275 1.50596 12.7075 1.95904 12.7075L14.9253 12.7075L9.28779 18.3279C9.12767 18.4867 9.00058 18.6757 8.91385 18.8839C8.82712 19.092 8.78247 19.3153 8.78247 19.5408C8.78247 19.7664 8.82712 19.9897 8.91385 20.1978C9.00058 20.406 9.12767 20.5949 9.28779 20.7538C9.4466 20.9139 9.63554 21.041 9.84372 21.1277C10.0519 21.2144 10.2752 21.2591 10.5007 21.2591C10.7262 21.2591 10.9495 21.2144 11.1577 21.1277C11.3659 21.041 11.5548 20.9139 11.7136 20.7538Z" fill="#555555"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className="bg-black text-white max-w-[300px] max-h-[60px] px-9 py-2 rounded-[20px] hover:bg-[#CAF0F8] sm:mb-4 hover:text-black outline outline-1 text-[14px] font-semibold mb-4 sm:mb-0 sm:mr-3"
                                >
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center items-center p-5">
                            {/* Additional content can go here */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <Datagizi />
            </div>
            <div className='mt-20'>
                <Support />
            </div>
            <div className='flex justify-center items-center text-4xl font-bold mt-20 '>
                <p>Blog Terbaru</p>
            </div>
            <Blog blogData={homeBlogData}/>
            <div className="text-center relative bottom-14">
                <button
                    onClick={handleTinjauClick}
                    className="bg-amber-50 text-black px-10 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors outline outline-1"
                >
                    Tinjau
                </button>
            </div>
            <Faq />
            <Footer />
        </div>
    );
};

export default Home;
