import React, { useEffect, useRef, useState } from 'react';

const BlogCard = ({ url, title, description, image, index }) => {
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
                className={`bg-white p-4 shadow shadow-2xl rounded-[40px] flex flex-col items-start cursor-pointer hover:scale-105 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                    transitionDelay: `${isVisible ? index * 150 : 0}ms`
                }}
            >
                <img src={image} alt={title} className="w-full mb-4 rounded-[40px]" />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <button className="text-blue-600 hover:text-blue-800 transition-colors">Learn more</button>
            </div>
        </a>
    );
};

export default BlogCard;
