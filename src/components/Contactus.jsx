import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaEnvelope, FaPhone, FaFax } from 'react-icons/fa';
import Logo from '../asset/logo/ThriveTerra Logo.png'
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const sendEmail = (e) => {
    e.preventDefault();

    // Mendapatkan nilai dari form fields
    const name = e.target.from_name.value.trim();
    const telp = e.target.telp.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    // Validasi form fields
    if (!name || !message || !telp || !email) {
        toast.error('Please fill in all fields.');
        return;
    }

    // Pengiriman email
    emailjs.sendForm('service_8hvz49x', 'template_qwqznrj', e.target, 'DqQ9BgAdzNdDUI1hW')
        .then((result) => {
            toast.success('Email has been sent successfully!');
        }, (error) => {
            toast.error('Failed to send email: ' + error.text);
        });
};

const Contactus = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div>
            <Navbar />
            <div className='bg-[#ade8f4] h-screen fixed inset-0 -z-20 '></div>
            <div className='bg-white h-screen fixed inset-0 -z-10 shadow-2xl rounded-tl-full rounded-br-full'></div>
            <div className="container mx-auto md:h-screen mt-20 md:mt-40 p-4 overflow-hidden ">

                <div className="mb-8 text-center" data-aos="fade-down">
                    <h1 className="text-3xl font-bold">GET IN <span className="text-sky-700">TOUCH</span></h1>
                    <p className="mt-3">Feel free to contact us anytime, either through our social media or the form below! We always open to creative ideas, criticism, and discussions!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-8 rounded-lg space-y-4 border shadow-md bg-white" data-aos="fade-right">
                        <div className="flex items-center mb-4">
                            <img src={Logo} alt="Logo" className="h-10" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">PT ThriveTerra Technology</h2>
                            <p>Jl. Veteran No.10-11, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <FaEnvelope className="text-blue-600 mr-2" />
                            <span>thriveterra@gmail.com</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <FaPhone className="text-blue-600 mr-2" />
                            <span>0341-575 754</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <FaFax className="text-blue-600 mr-2" />
                            <span>0341-575 754</span>
                        </div>
                    </div>

                    <form className="p-8 rounded-lg space-y-4 border shadow-md bg-white" onSubmit={sendEmail} data-aos="fade-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="from_name"
                                className="bg-gray-200 p-2 w-full outline-none rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-[#CAF0F8]"
                                type="text"
                                placeholder="Nama Anda"
                            />
                            <input
                                name="telp"
                                className="bg-gray-200 p-2 w-full outline-none rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-[#CAF0F8]"
                                type="text"
                                placeholder="Nomor Telepon Anda"
                            />
                        </div>
                        <input
                            name="email"
                            className="bg-gray-200 p-2 w-full outline-none rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-[#CAF0F8]"
                            type="email"
                            placeholder="Email anda"
                        />
                        <textarea
                            name="message"
                            className="bg-gray-200 p-2 w-full h-32 outline-none rounded-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-[#CAF0F8]"
                            placeholder="Beri tahu kami masukan anda"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-6 bg-black hover:bg-[#CAF0F8] text-white hover:text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out outline outline-1"
                        >
                            Kirim Pesan
                        </button>
                        <ToastContainer />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contactus;
