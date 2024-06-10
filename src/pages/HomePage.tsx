import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { Navigate, Link, Router, Route } from 'react-router-dom';


interface Note {
  id: number;
  text: string;
}

const HomePage = () => {
  
  console.log('check HomePage');
  
  let token = localStorage.getItem('authTokens');
  let parsedToken = token ? JSON.parse(token) : null;
  const authContext = useContext<AuthContextType>(AuthContext);

  let { logOutUser } = authContext;

  

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parsedToken?.access}`,
      }
    });
    let data = await response.json();
    if(response.status === 200){
      // setNotes(data);
    }
    else if(response.statusText === 'Unauthorized'){	
        logOutUser();
    }
    
  };

  return (
    <div>
   
      <Link to={"/doctors"}><p>Top Doctor</p></Link>
      <Link to={"/doctors"}><p>Pharmacy</p></Link>
      
      <p>Ambulance</p>
      {/* <ul>
        {notes.map(note => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default HomePage;
