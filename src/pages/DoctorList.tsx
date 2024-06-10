import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const DoctorList = () => {
    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        getDoctorList();
    }, [])

    const getDoctorList = async () => {

        let response = await fetch('http://127.0.0.1:8000/api/doctors/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json();
        console.log(data)

        setDoctorList(data);

    }

  return (
    <div>
      <h1>Doctor List</h1>
      <ul>
        {doctorList.map((doctor: any) => (
          <li key={doctor.id}>
            <Link to={`/doctors/${doctor.id}`}>{doctor.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DoctorList
