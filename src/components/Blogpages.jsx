import React, { useEffect } from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Footer from './Footer'; // Assuming you have a Footer component
import Blogcartoon from '../asset/blog-writer.png';
import Blog from "./Blog";
import OrangLapar from '../asset/lapar.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Wavebg from '../asset/wave/wave3.svg';
import Blog1 from '../asset/blog/blog1.jpg';
import Blog2 from '../asset/blog/blog2.jpg';
import Blog3 from '../asset/blog/blog3.jpg';
import Blog4 from '../asset/blog/blog4.jpg';
import Blog5 from '../asset/blog/blog5.jpg';
import Blog6 from '../asset/blog/blog6.jpg';
import Blog8 from '../asset/blog/blog8.jpg';
import Blog7 from '../asset/blog/blog7.jpg';

const homeBlogData = [
    {
        url: "/",
        title: "Mendorong Kebijakan untuk Mengurangi Pemborosan Pangan di Indonesia",
        description: "ThriveTerra aktif berpartisipasi dalam advokasi kebijakan untuk mengurangi...",
        image: Blog8
    },
    {
        url: "/blogs",
        title: "Kenali Food Waste dan Food Loss Penyebab Pemborosan Pangan!",
        description: "Memahami perbedaan antara food waste dan food loss serta dampaknya terhadap pemborosan pangan di Indonesia....",
        image: Blog7
    },
    {
        url: '/',
        title: "Sinergi dengan Universitas Lokal untuk Riset Pangan Berkelanjutan",
        description: "Design",
        image: Blog5,
    },
];

const dummyData = {
    latest: [
        {
            id: 1,
            title: "Meningkatkan Efisiensi Distribusi Pangan dengan Teknologi Terbaru",
            category: "Tech",
            description: "ThriveTerra selalu berupaya untuk memanfaatkan teknologi terbaru ...",
            image: Blog1, // Replace with actual image URL
            date: "Feb 12",
            readTime: "9 min read"
        },
        {
            id: 2,
            title: "Distribusi Pangan Sukses di Daerah Terdampak Bencana di Sulawesi",
            category: "Distribusi",
            description: "Tim ThriveTerra berhasil mendistribusikan bantuan pangan ke beberapa daerah di Sulawesi yang ...",
            image: Blog2, // Replace with actual image URL
            date: "Dec 02",
            readTime: "3 min read"
        },
        {
            id: 3,
            title: "Kolaborasi Baru dengan Perusahaan Agritech untuk Meningkatkan Ketersediaan Pangan",
            category: "Mitra",
            description: "ThriveTerra dengan bangga mengumumkan kemitraan baru...",
            image: Blog3, // Replace with actual image URL
            date: "Oct 22",
            readTime: "5 min read"
        },
        {
            id: 4,
            title: "Cerita dari Lapangan: Mengubah Hidup dengan Setiap Bungkus Makanan",
            category: "Tech",
            description: "Di sebuah desa kecil di Jawa Tengah, kami bertemu dengan Ibu Siti...",
            image: OrangLapar, // Replace with actual image URL
            date: "Oct 10",
            readTime: "7 min read"
        },
    ],
    featured: [
        {
            id: 1,
            title: "Sinergi dengan Universitas Lokal untuk Riset Pangan Berkelanjutan",
            category: "Design",
            image: Blog5, // Replace with actual image URL
        },
        {
            id: 2,
            title: "Peningkatan Ketersediaan Pangan di Nusa Tenggara Timur",
            category: "Tech",
            image: Blog4, // Replace with actual image URL
        },
        {
            id: 3,
            title: "Mendukung Kebijakan Zero Waste untuk Mengatasi Kelaparan",
            category: "Tech",
            image: Blog6, // Replace with actual image URL
        },
    ]
};

const BlogPages = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="fixed inset-0 -z-10 ">
                <div className="absolute inset-y-0 -left-[700px] w-full h-full bg-no-repeat bg-left bg-contain transform rotate-[90deg]" style={{ backgroundImage: `url(${Wavebg})` }}></div>
            </div>
            <div className='h-screen fixed inset-0 -z-20'></div>
            <div className="fixed inset-0 -z-10 ">
                <div className="absolute inset-y-0 -right-[800px] w-full h-full bg-no-repeat bg-left bg-contain transform rotate-[270deg]" style={{ backgroundImage: `url(${Wavebg})` }}></div>
            </div>
            <div className="py-16 px-4 mt-10 mb-12" data-aos="fade-up">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            Selamat Datang <br /> di Blog ThriveTerra!
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            Di sini, kami berbagi cerita, wawasan, dan pembaruan terbaru tentang upaya kami dalam mengatasi kelaparan global dan mengurangi pemborosan pangan
                        </p>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
                        <img src={Blogcartoon} alt="Hero Illustration" className="w-full lg:w-3/4" />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 bg-gradient-to-t from-[#0096c7] to-[#023e8a] shadow-2xl shadow-white rounded-full pb-10">
                <div className="flex justify-center text-white items-center mb-8" data-aos="fade-right">
                    <h1 className="text-4xl font-bold">Popular</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {dummyData.latest.map((product) => (
                        <button href={product.url} key={product.id} className="no-underline">
                            <div className="bg-white p-4 shadow-md rounded-[40px]" data-aos="fade-up" data-aos-delay="200">
                                <img src={product.image} alt={product.title} className="rounded-[40px] mb-4" />
                                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{product.date}</span>
                                    <span>{product.readTime}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2" data-aos="fade-up">
                        <div className="bg-white p-4 shadow-md rounded-[40px]">
                            <img src={dummyData.latest[0].image} alt={dummyData.latest[0].title} className="rounded-[40px] mb-4" />
                            <h2 className="text-2xl font-bold mb-2">{dummyData.latest[0].title}</h2>
                            <p className="text-gray-600 mb-4">{dummyData.latest[0].description}</p>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>{dummyData.latest[0].date}</span>
                                <span>{dummyData.latest[0].readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {dummyData.latest.slice(1).map(post => (
                            <div key={post.id} className="bg-white p-4 shadow-md rounded-[40px]" data-aos="fade-up" data-aos-delay="200">
                                <img src={post.image} alt={post.title} className="rounded-[40px] mb-4" />
                                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                <p className="text-gray-600 mb-2">{post.description}</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-4xl text-white font-bold mb-8" data-aos="fade-left"><span className='text-black'> Featured Artic</span>les</h2>
            </div>
            <Blog blogData={homeBlogData}/>
            <Footer />
        </div>
    );
};

export default BlogPages;
