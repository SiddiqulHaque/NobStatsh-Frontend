import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faqs/fetch');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleExpand = (position) => {
    setExpanded(expanded === position ? null : position);
  };

  return (
    <div className="flex ">
      <div className="flex-1 p-6 ">
        <h2 className="text-xl font-bold mb-4 pl-2 pb-4 border-black border-b-2">Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.position} className="mb-2">
            <div 
              className={`flex justify-between items-center bg-white p-2 pl-4 rounded-xl border-gray-400 border cursor-pointer shadow-sm ${expanded === faq.position && 'shadow-md'}`} 
              onClick={() => toggleExpand(faq.position)}
            >
              <span className="font-bold">{faq.position}. {faq.question}</span>
              {expanded === faq.position ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {expanded === faq.position && (
              <div className="p-4 bg-white rounded-xl mt-2 border-gray-400 border shadow-inner">
                <p><strong>{faq.question}</strong></p>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
