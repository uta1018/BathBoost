import React from 'react'
import { useNavigate } from 'react-router-dom';

const SetBathGoal = () => {
  const navigate = useNavigate();

  const navigateTimeSelect = () => {
    navigate("/timeselect");
  };

  return (
    <div>
      <button onClick={navigateTimeSelect}>お風呂に入る!宣言をする</button>
    </div>
  )
}

export default SetBathGoal
