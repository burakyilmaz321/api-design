import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

// components
import InputReading from "./components/InputReading";
import ListReadings from './components/ListReadings';
import Leaderboard from './components/Leaderboard';


function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
      try {
          const response = await fetch(`https://reading-challenge-backend.herokuapp.com/users/`);
          const jsonData = await response.json();
          setUsers(jsonData);
      } catch (err) {
          console.error(err.message)
      }
  }
  useEffect(() => {
    getUsers();
  }, []);

  const [user, setUser] = useState();

  return <Fragment>
    <div className="container">
      <button
        type="button"
        className={`btn btn-outline-info btn-sm mr-1 mt-5 ${showLeaderboard && "active"}`}
        onClick={e => setShowLeaderboard(true)}>Leaderboard</button>        
      {users.map(u => (
        <button
          type="button"
          key={u.id}
          className={`btn btn-outline-dark btn-sm mr-1 mt-5 ${(user === u) & !showLeaderboard && "active"}`}
          onClick={e => {setUser(u); setShowLeaderboard(false)}}>{u.name}</button>
      ))}
      {showLeaderboard === true && <Leaderboard/>}
      {showLeaderboard === false && <h1 className="text-center mt-5">Reading List</h1>}
      {showLeaderboard === false && <InputReading user={user.id}/>}
      {showLeaderboard === false && <ListReadings user={user}/>}
    </div>
  </Fragment>;
}

export default App;
