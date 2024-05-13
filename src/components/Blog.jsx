import React, { useEffect, useRef, useState } from 'react';
import OrangLapar from '../asset/lapar.jpeg'; 

const BlogCard = ({ url, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <a href={url} className="no-underline">
      <div
        ref={cardRef}
        className={`bg-white p-4 shadow rounded-lg flex flex-col items-start cursor-pointer hover:scale-105 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          transitionDelay: `${isVisible ? index * 150 : 0}ms`
        }}
      >
        <img src={OrangLapar} alt="Blog" className="w-full mb-4" />
        <h3 className="font-semibold text-lg mb-2">Humans are much more smarter than AI</h3>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="text-blue-600 hover:text-blue-800 transition-colors">Learn more</button>
      </div>
    </a>
  );
};

const Blog = () => {
  const blogUrl = "/path-to-blog"; 

  return (
    <div className="py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Blog Terbaru</h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {[...Array(3).keys()].map((index) => (
          <BlogCard key={index} index={index} url={blogUrl} />
        ))}
      </div>
      <div className="text-center">
        <button className="bg-black text-white px-10 py-2 rounded-full font-semibold hover:bg-[#CAF0F8] hover:text-black transition-colors outline outline-1">
          Tinjau 
        </button>
      </div>
    </div>
  );
};

export default Blog;
