import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  console.log('check DoctorList');
  const [doctorList, setDoctorList] = useState<any[]>([]); // Specify any[] as the type


  const getDoctorList = useCallback(async () => {
    let response = await fetch('http://127.0.0.1:8000/api/doctors/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    let data = await response.json();
    console.log(data);
    setDoctorList(data);
  }, []); // No dependencies to ensure it's only called once

  useEffect(() => {
    getDoctorList();
  }, [getDoctorList]); // Pass the memoized function to the dependency array

  return (
    <div>
      <h1>Doctor List</h1>
      <ul>
        {doctorList.map((doctor) => (
          <li key={doctor.id}>
            <Link to={`/doctors/${doctor.id}`}>{doctor.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
