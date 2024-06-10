import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface DoctorType {
  name: string;
  occupation: string;
  rating: string;
}

const Doctor = () => {
  console.log('check Doctor');
  const [doctor, setDoctor] = useState<DoctorType | null>(null);
  const [schedule, setSchedule] = useState<any | null>(null);
  const [initial, setInitial] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>(); 

  const schedule_list: String[] = [];
  const schedule_time_list: Date[] = [];

  useEffect(() => {
    if (id) {
      getDoctor();
      getSchedule(Number(id));
    }
  }, [id]); // Empty dependency array to run only once on initial render
  

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
      console.log('schedule_list', schedule_list)
    

      // console.log('schedule_list', schedule_list)
    }
  }

  const scheduleForWeek = (sch : any) => {

    const day_library = {
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
      "Sunday": 0
    }
    console.log('Monday', day_library["Monday"])

    console.log('scheduleForWeek', sch)
    let len = sch.length;
    console.log(len)
    
    if(initial){
      let j = 0;
      let temp = 0;
      for(let i = 0; i < 7; i++){
          if(j === len  ){
            j = 0
            temp+= 7;
          }
          schedule_list.push(sch[j])
          schedule_time_list.push(getDate(day_library[sch[j].toString() as keyof typeof day_library] + temp))
          j++;
      }
      console.log('Hit')
    }
    setInitial(false)

    console.log('schedule_time_list', schedule_time_list)
    
    

  }

  const getDate = (ref_date: number) => {
    var today = new Date();
    var currentDayOfWeek = today.getDay();
    var daysUntilSaturday = ref_date - currentDayOfWeek;
    if (currentDayOfWeek === ref_date) {
        daysUntilSaturday += 7;
    }
    
    // Create a new Date object for next Saturday
    var nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    
    // Output the date of next Saturday
    
    return nextSaturday;
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
