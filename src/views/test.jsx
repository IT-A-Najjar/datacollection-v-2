import React, { useState, useEffect } from 'react';

const GenderComponent = () => {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('https://rooting-institute.com/api/Genders');

    eventSource.onopen = () => {
      console.log('SSE connected');
    };

    eventSource.onmessage = (event) => {
      const newRecord = JSON.parse(event.data);
      setGenders(prevGenders => [...prevGenders, newRecord]);
    };

    eventSource.onerror = () => {
      console.error('SSE error');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Genders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {genders.map(gender => (
            <tr key={gender.genderId}>
              <td>{gender.genderId}</td>
              <td>{gender.genderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenderComponent;
