import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaSmile, FaHome, FaStar, FaCheckCircle } from 'react-icons/fa';

const CounterSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  // Icon array
  const items = [
    {
      end: 1200,
      suffix: '+',
      label: 'Happy Customers',
      icon: <FaSmile className="text-4xl text-indigo-600 transition-transform duration-300 group-hover:scale-125" />,
    },
    {
      end: 850,
      suffix: '+',
      label: 'Properties Listed',
      icon: <FaHome className="text-4xl text-green-600 transition-transform duration-300 group-hover:scale-125" />,
    },
    {
      end: 4.9,
      decimals: 1,
      label: 'Average Rating',
      icon: <FaStar className="text-4xl text-yellow-500 transition-transform duration-300 group-hover:scale-125" />,
    },
    {
      end: 100,
      suffix: '%',
      label: 'Verified Properties',
      icon: <FaCheckCircle className="text-4xl text-emerald-600 transition-transform duration-300 group-hover:scale-125" />,
    },
  ];

  return (
    <div
      ref={ref}
      className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-black"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="group bg-white border border-indigo-100 p-6 rounded-xl shadow-xl transition hover:shadow-xl duration-300 hover:scale-105"
        >
          <div className="mb-3 flex justify-center">{item.icon}</div>
          <h2 className="text-3xl font-extrabold text-indigo-700">
            {inView && (
              <CountUp
                end={item.end}
                duration={2}
                suffix={item.suffix || ''}
                decimals={item.decimals || 0}
              />
            )}
          </h2>
          <p className="text-sm mt-2 font-medium text-gray-700">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;
