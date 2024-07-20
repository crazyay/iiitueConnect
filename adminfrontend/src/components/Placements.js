// src/components/PlacementList.js
import React from 'react';
import StudentCard from './StudentCard';

const PlacementList = ({ placements }) => {
  return (
    <div className="p-4">
      <h1 className="text-5xl text-blue-500 font-bold mb-4 text-center">Placements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {placements.map((placement, index) => (
          <StudentCard key={index} student={placement} />
        ))}
      </div>
    </div>
  );
};

export default PlacementList;
