// src/BlogPage.js
import React from 'react';
import Navbar from "./Navbar";
import Footer from './Footer';
import Blog7 from '../asset/blog/blog7.jpg';
import Blog from './Blog';
import Blog4 from "../asset/blog/blog4.jpg";
import Blog6 from '../asset/blog/blog6.jpg'
import Blog9 from '../asset/blog/blog9.jpg'

const homeBlogData = [
    {
        url: "/blogs",
        title: "Peningkatan Ketersediaan Pangan di Nusa Tenggara Timur",
        description: "ThriveTerra aktif berpartisipasi dalam peningkatan pangan...",
        image: Blog4
    },
    {
        url: "/path-to-blog-2",
        title: "Inisiatif Pengurangan Food Loss dalam Rantai Pasokan",
        description: "Bergabung dengan kami dalam mengurangi food loss melalui teknologi inovatif...",
        image: Blog9
    },
    {
        url: "/path-to-blog-3",
        title: "Mendukung Kebijakan Zero Waste untuk Mengatasi Kelaparan",
        description: "Kami sangat mendukung segala kegiatan yang...",
        image: Blog6
    }
];

const BlogPage = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-50 text-gray-800 min-h-screen p-4">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Kenali Food Waste dan Food Loss Penyebab Pemborosan Pangan!</h1>
                        <p className="text-gray-600">
                            Memahami perbedaan antara food waste dan food loss serta dampaknya terhadap pemborosan pangan di Indonesia.
                        </p>

                        <div className="text-sm text-gray-500 mt-2">
                            <span>4 MIN READ</span> • <span>MAY 26, 2024</span>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <span className="text-gray-500">Share:</span>
                            <a href="#" className="text-blue-500 hover:underline">Facebook</a>
                            <a href="#" className="text-blue-500 hover:underline">Twitter</a>
                            <a href="#" className="text-blue-500 hover:underline">LinkedIn</a>
                        </div>
                    </header>

                    <div className="mb-8">
                        <img
                            src={Blog7} // Replace with actual image path
                            alt="Planting Trees"
                            className="w-full rounded-lg"
                        />
                    </div>

                    <article className="prose lg:prose-xl mb-8">
                        <p>By <strong className='italic font-light text-lg'>Andrew Daniel & Askatanda Vijayavaglia</strong> </p> <br />
                        <p>Pemborosan pangan merupakan masalah serius yang dihadapi banyak negara, termasuk Indonesia. Dalam konteks ini, penting untuk memahami dua istilah utama: food waste dan food loss. Kedua istilah ini memiliki arti dan dampak yang berbeda terhadap rantai pasokan pangan dan lingkungan kita.</p>
                        <br />
                        <p>
                            <strong>Food Loss</strong> merujuk pada kehilangan pangan yang terjadi pada tahap produksi, pasca-panen, dan pemrosesan. Hal ini biasanya disebabkan oleh masalah dalam rantai pasokan, seperti penyimpanan yang tidak memadai, distribusi yang buruk, atau kondisi cuaca yang merugikan. Food loss terjadi sebelum pangan sampai ke konsumen dan seringkali di luar kendali mereka.
                        </p>

                        <div className="my-6 p-4 bg-green-100 rounded-lg">
                            <h2 className="text-green-700">Our Sustainability Commitments</h2>
                            <p>
                                ThriveTerra menyadari pentingnya mengatasi kedua masalah ini untuk menciptakan sistem pangan yang lebih berkelanjutan. Kami bekerja sama dengan petani, distributor, dan konsumen untuk mengurangi food loss dan food waste melalui berbagai inisiatif. </p>
                        </div>
                        <br />
                        <p>
                            Salah satu program kami adalah pelatihan bagi petani tentang teknik penyimpanan dan pemrosesan pasca-panen yang lebih baik. Dengan demikian, kami dapat membantu mereka meminimalkan kerugian selama transportasi dan penyimpanan. Selain itu, kami mendorong penggunaan teknologi untuk memantau dan mengelola stok pangan secara lebih efisien, sehingga mengurangi kemungkinan terjadinya food loss.
                        </p>
                        <br />
                        <p>
                            Untuk mengurangi food waste, kami mengedukasi konsumen tentang pentingnya perencanaan makanan dan penyimpanan yang tepat. Kami juga bekerja sama dengan ritel untuk mendonasikan makanan yang tidak terjual tetapi masih layak konsumsi kepada mereka yang membutuhkan. Melalui program donasi ini, kami telah berhasil menyelamatkan ribuan ton makanan dari tempat pembuangan sampah dan memberikannya kepada keluarga yang kekurangan.
                        </p>

                        <br />
                        <p>
                            Kampanye kesadaran adalah komponen penting dari upaya kami. Kami menggunakan platform media sosial dan acara komunitas untuk menyebarkan pesan tentang dampak negatif dari pemborosan pangan dan cara-cara praktis untuk menguranginya. Dengan meningkatkan kesadaran publik, kami berharap dapat mengubah perilaku konsumen dan menciptakan budaya yang lebih sadar pangan.
                        </p>
                        <br />
                        <p>
                            Selain itu, ThriveTerra terus mendorong kebijakan yang mendukung pengurangan pemborosan pangan. Kami berpartisipasi dalam dialog kebijakan dengan pemerintah dan lembaga terkait untuk mengembangkan regulasi yang mendukung sumbangan pangan dan insentif bagi perusahaan yang mengimplementasikan praktik pengelolaan pangan yang lebih baik.
                        </p>
                        <br />
                        <p>
                            Pentingnya memahami perbedaan antara food loss dan food waste adalah langkah awal untuk mengatasi pemborosan pangan. Dengan tindakan kolektif dari semua pihak dalam rantai pasokan pangan, kita dapat menciptakan sistem pangan yang lebih efisien dan berkelanjutan. Ikuti perkembangan terbaru tentang inisiatif dan kebijakan kami di blog ini, dan bersama-sama kita bisa membuat perubahan positif bagi lingkungan dan masyarakat. Kami mengundang Anda untuk bergabung dengan kami dalam upaya mengurangi pemborosan pangan dan menciptakan masa depan yang lebih baik untuk generasi mendatang.</p>
                    </article>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Another Blogs</h2>
                        <Blog blogData={homeBlogData} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;
