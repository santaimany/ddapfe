import React, { useState, useEffect, useRef } from 'react';



const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <h2
        className="text-lg px-5 py-4 flex justify-between items-center cursor-pointer text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span
          className={`text-xl transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        >
          {isOpen ? '−' : '+'}
        </span>
      </h2>
      <div
        className={`transition-height duration-500 ease-in-out overflow-hidden text-gray-600 ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <p className="px-5 pt-0 pb-4">{answer}</p>
      </div>
    </div>
  );
};

// FAQ List Component
const Faq = () => {
  const faqs = [
    {
      question: '1. Apa itu ThriveTerra?',
      answer: 'ThriveTerra adalah website yang bergerak dalam mengatasi kelaparan global (zero hunger) dengan fokus pada pengumpulan data dan pendistribusian surplus pangan ke daerah-daerah yang membutuhkan.',
    },
    {
        question: '2. Bagaimana cara ThriveTerra bekerja?',
        answer: 'ThriveTerra bekerja melalui dua langkah utama:\n' +
            '\n' +
            'Pendataan: Mengumpulkan data tentang surplus pangan dari berbagai sumber.\n' +
            'Distribusi: Menyalurkan kelebihan pangan tersebut ke komunitas yang membutuhkan.',
      },
      {
        question: '3. Mengapa penting untuk mendistribusikan surplus pangan?',
        answer: 'Distribusi surplus pangan membantu mengurangi pemborosan makanan dan memastikan bahwa makanan yang berlebih dapat dimanfaatkan oleh mereka yang membutuhkan, sehingga dapat mengurangi tingkat kelaparan.',
      },
      {
        question: '4. Bagaimana ThriveTerra memastikan bahwa pangan yang didistribusikan aman dan berkualitas?',
        answer: 'Kami bekerja sama dengan mitra terpercaya dan memastikan semua pangan yang didistribusikan telah melalui pemeriksaan kualitas dan keamanan sesuai standar yang berlaku.',
      },
  ];

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
    <div className="w-full max-w-3xl mx-auto mt-7 mb-12">
      <h1 ref={textRef}  className="text-2xl font-semibold text-black text-center py-4 boxup">
        Frequently Asked Questions
      </h1>
      <div  className="divide-y divide-gray-300 font-semibold">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
