import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const ManageFAQs = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [position, setPosition] = useState('');
  const [deletePosition, setDeletePosition] = useState('');

  const handleInsert = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/faqs/insert', {
        question,
        answer,
        position: parseInt(position),
      });
      if (response.status === 201) {
        console.log('FAQ inserted successfully');
        setQuestion('');
        setAnswer('');
        setPosition('');
      }
    } catch (error) {
      console.error('Error inserting FAQ:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/faqs/delete', {
        data: { position: parseInt(deletePosition) },
      });
      if (response.status === 200) {
        console.log('FAQ deleted successfully');
        setDeletePosition('');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        {/* Post FAQ */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-4 border-black">POST FAQs</h2>
          <div className='ml-16'>
            <div className="flex items-center mb-2 mt-12">
              <div className="font-semibold mr-20">Question</div>
              <input
                name="question"
                placeholder="Enter question"
                className="p-1 border rounded w-5/12"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-2 mt-8">
              <div className="font-semibold mr-20">Answer</div>
              <input
                name="answer"
                placeholder="Enter answer"
                className="ml-3 p-1 border rounded w-5/12"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-2 mt-8">
              <div className="font-semibold mr-20">Position</div>
              <input
                name="position"
                type="number"
                placeholder="Enter Q&A position number"
                className="ml-2 p-1 border rounded w-5/12"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <button className="bg-black mt-8 text-white p-3 w-32 rounded-lg" onClick={handleInsert}>Insert</button>
          </div>
        </div>

        {/* Delete FAQ */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-4 border-black">Delete FAQs</h2>
          <div className='ml-16'>
            <div className="flex items-center mb-2 mt-2">
              <div className="font-semibold mr-20">Position</div>
              <input
                name="deletePosition"
                type="number"
                placeholder="Enter Q&A position number"
                className="ml-2 p-1 border rounded w-5/12"
                value={deletePosition}
                onChange={(e) => setDeletePosition(e.target.value)}
              />
            </div>
            <button className="bg-black mt-8 text-white p-3 w-32 rounded-lg" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFAQs;
