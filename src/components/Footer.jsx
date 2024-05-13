import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faFacebook, faXTwitter} from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef(null);
    const listRef = useRef(null);

    const checkVisibility = (ref, className) => {
        const triggerBottom = window.innerHeight / 5 * 6;
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
    <footer id='contact' ref={textRef} className="w-full bg-gray-200 py-5 boxup">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center ">
        <div className="mb-2 text-lg font-semibold">Connect with us</div>
        <div className="flex space-x-4 mb-4">
          <a href="https://instagram.com" target="_blank" rel="#">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://example.com" target="_blank" rel="#">
          <FontAwesomeIcon icon={faXTwitter} size="2x"/>
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="#">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="#">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        </div>
        <div className="text-sm text-gray-600">&copy; 2024 ThriveTerra, Inc. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
