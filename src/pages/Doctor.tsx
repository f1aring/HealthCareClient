import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface DoctorType {
  name: string;
  occupation: string;
  rating: string;
}

const Doctor = () => {
  const [doctor, setDoctor] = useState<DoctorType | null>(null);
  const [schedule, setSchedule] = useState<any | null>(null);
  const { id } = useParams<{ id: string }>(); 

  const schedule_list: String[] = [];


  useEffect(() => {
    if (id) {
      getDoctor();
      getSchedule(Number(id));
    }
  }, [id]);

  const getDoctor = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/doctors/${id}/`);
    let data = await response.json();
    setDoctor(data);
    
  };

  const getSchedule = async (id: number) => {
    console.log(`http://127.0.0.1:8000/api/schedule/${id}/`)
    let response = await fetch(`http://127.0.0.1:8000/api/schedule/${id}/`);
    let data = await response.json();
    setSchedule(data);
    console.log('check data', data);
    if(data){
      const sch = data.day
      const sch_len = sch.length
      scheduleForWeek(sch)

    

      // console.log('schedule_list', schedule_list)
    }
  }

  const scheduleForWeek = (sch : any) => {


    console.log('scheduleForWeek', sch)
    let len = sch.length;
    console.log(len)
    
    let j = 0;
    for(let i = 0; i < 7; i++){
        if(j === len - 1){
          j = 0
        }

        console.log(sch[i])
        j++;
    }
    // for (let i = 0; i < 7; i++) {
    //   let j = 0;


    //   schedule_list.push(sch[j])
    //   j++;
    // }
  }




  if (!doctor) return <div>Loading...</div>;

  return (
    <>
    <div>
      <p>Name: {doctor.name}</p>
      <p>Occupation: {doctor.occupation}</p>
      <p>Rating: {doctor.rating}</p>
    </div>
    </>
  );
};

export default Doctor;
