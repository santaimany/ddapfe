import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Homeimg from '../asset/pmr-bg-slide.jpg';
import Datagizi from './Datagizi';
import Support from './Support';
import Blog from './Blog';
import Faq from './FAQ';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
    const boxRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkBoxes = () => {
            const triggerBottom = (window.innerHeight/5) * 4;
            const box = boxRef.current;
            const boxTop = box.getBoundingClientRect().top;
            if(boxTop < triggerBottom) box.classList.add('show');
            else box.classList.remove('show');


            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else if (window.innerWidth <= 1366){
                setIsMobile(true);
            }
            else {
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


    return (<div>
        <Navbar/>
            <div id='home' className="flex justify-center items-center h-screen p-5 pr-5 md:pr-10 lg:pr-[150px] box-border fade-in" style={{backgroundImage: `url(${Homeimg})`, backgroundSize: isMobile ? 'cover' : '100% 100%', backgroundPosition: 'center'}}>

            <div  className="flex flex-col  md:flex-row w-full max-w-6xl py-[160px] px-10  ">
                <div ref={boxRef}  className="flex-1 boxr w-full bg-[#F4F4F4]  container mx-auto p-4 ">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-4">Semua Layak Untuk Hidup Dengan Tenang</h1>
                    <p className="mb-4">Dengan upaya ini, bersama kita menuntaskan kelaparan</p><br/>
                    <button onClick={gotoPageProgram}
        className="bg-slate-800 text-white max-w-[300px] max-h-[60px] px-9 py-2 rounded-[20px] hover:bg-[#CAF0F8] hover:text-black outline outline-1 text-[14px]">Pelajari Lebih Lanjut </button>
                </div>
                <div className="flex-1 flex justify-center items-center p-5">

                </div>
            </div>

        </div>
        <Datagizi/>
        <Support/>
        <Blog/>
        <Faq/>
        <Footer/>


        </div>
    );
};

export default Home;
