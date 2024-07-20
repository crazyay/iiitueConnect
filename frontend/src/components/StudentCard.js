// src/components/StudentCard.js

import React from 'react';
const StudentCard = ({ student }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md student-card">
      <img className="rounded-full mb-4" src={student.logo} alt={student.company} />
      <div>
        <h3 className="text-xl font-bold mb-2">{student.name}</h3>
        <p className=" text-xl font-serif font-bold text-gray-600">{student.company} - {student.package}</p>
      </div>
    </div>
  );
};

export default StudentCard;
