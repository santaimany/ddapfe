import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';

highchartsMap(Highcharts);

const CountUpAnimation = ({ target, duration }) => {
    const [count, setCount] = useState(0);
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    const countUp = () => {
        if (animated) return;
        let start = 0;
        const end = parseInt(target);
        const stepTime = duration / end;

        const incrementCount = () => {
            start += Math.ceil(end / 1000);
            setCount(start);
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
                setAnimated(true);
            }
        };

        const timer = setInterval(incrementCount, stepTime);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animated) {
                        countUp();
                        observer.unobserve(ref.current);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

const Datagizi = () => {
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef(null);
    const listRef = useRef(null);
    const containerRef = useRef(null);

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

    useEffect(() => {
        fetch('https://code.highcharts.com/mapdata/countries/id/id-all.geo.json')
            .then(response => response.json())
            .then(topology => {
                const data = [
                    ['id-3700', 10], ['id-ac', 11], ['id-jt', 12], ['id-be', 13],
                    ['id-bt', 14], ['id-kb', 15], ['id-bb', 16], ['id-ba', 17],
                    ['id-ji', 0], ['id-ks', 19], ['id-nt', 20], ['id-se', 21],
                    ['id-kr', 22], ['id-ib', 23], ['id-su', 24], ['id-ri', 25],
                    ['id-sw', 26], ['id-ku', 27], ['id-la', 28], ['id-sb', 29],
                    ['id-ma', 30], ['id-nb', 31], ['id-sg', 32], ['id-st', 33],
                    ['id-pa', 34], ['id-jr', 35], ['id-ki', 66], ['id-1024', 37],
                    ['id-jk', 38], ['id-go', 39], ['id-yo', 40], ['id-sl', 41],
                    ['id-sr', 42], ['id-ja', 43], ['id-kt', 44]
                ];

                if (containerRef.current) {
                    Highcharts.mapChart(containerRef.current, {
                        chart: {
                            map: topology,
                        },
                        title: {
                            text: 'Peta Penyebaran Gizi di Indonesia'
                        },
                        subtitle: {
                            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.topo.json">Indonesia | by Google Maps</a>'
                        },
                        mapNavigation: {
                            enabled: true,
                            buttonOptions: {
                                verticalAlign: 'bottom'
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max: 100,
                            labels: {
                                formatter: function () {
                                    return this.value + "%";
                                }
                            }
                        },
                        series: [{
                            data: data,
                            name: 'Gizi',
                            states: {
                                hover: {
                                    color: '#48CAE4'
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }],
                        credits: {
                            enabled: false
                        }
                    });
                }
            });
    }, []);

    return (
        <div ref={titleRef} className="max-w-4xl mx-auto p-6 mt-20 boxr w-full h-screen bg-white text-black  shadow-2xl shadow-[#00b4d8]" >
            <h2 className="text-2xl font-bold text-center mb-4">
                Data Sebaran Tingkat Gizi di Indonesia
            </h2>
            <p className="text-center mb-8 ">
                Melalui analisis data yang mendalam, kami mengidentifikasi wilayah-wilayah yang mengalami kekurangan gizi serta upaya yang diperlukan untuk mengatasinya.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-left ">
                    <thead>
                    <tr className="border-b">
                        <th className="pb-4 pt-2">Indeks Kelaparan (GHI)</th>
                        <th className="pb-4 pt-2 px-4">Peringkat</th>
                        <th className="pb-4 pt-2">Jumlah Penduduk yang Kelaparan</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="pt-4 px-4"><CountUpAnimation target="12" duration={1500} /></td>
                        <td className="pt-4 px-4"><CountUpAnimation target="77" duration={1500} /></td>
                        <td className="pt-4 px-4"><CountUpAnimation target="16413550" duration={1500} /></td>
                    </tr>
                    </tbody>
                </table>
                <div ref={containerRef} className="h-96 md:h-auto w-full md:w-11/12 xl:w-full mx-auto my-4"></div>
            </div>
            <p className='font-extralight italic text-sm '>* Semakin tinggi persentasenya, semakin baik tingkat gizi daerah tersebut.</p>
        </div>
    );
};

export default Datagizi;
