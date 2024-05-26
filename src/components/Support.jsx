import React, { useState, useEffect } from 'react';
import LogoSupport from '../asset/logoplaceholder.svg';
import Logoub from '../asset/Logo_Universitas_Brawijaya.svg.png';
import LogoFilkom from '../asset/logo_filkom.png';

const logos = [
  LogoSupport,
  Logoub,
  LogoFilkom
];

const Support = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setFade(false), 2500);

    const changeLogoTimer = setTimeout(() => {
      setCurrentLogoIndex((currentLogoIndex + 1) % logos.length);
      setFade(true);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeLogoTimer);
    };
  }, [currentLogoIndex]);

  return (
      <div className="py-8 ">
        <h2 className="text-center text-2xl  font-semibold mb-6">Didukung Oleh</h2>
        <div className="flex justify-center items-center gap-8 flex-wrap px-6">
          <div className="bg-white p-4 rounded-lg ">
            <img
                src={logos[currentLogoIndex]}
                alt="logo support"
                className={`h-12 transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      </div>
  );
};

export default Support;
