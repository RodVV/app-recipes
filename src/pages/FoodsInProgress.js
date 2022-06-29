import React, { useState } from 'react';
import InProgressFoodCard from './components/InProgressFoodCard';

function FoodsInProgress() {
  const [check, setCheck] = useState([]);

  const handleRadio = (i) => {
    if (check.some((e) => e === i)) {
      const a = check.filter((e) => e !== i);
      setCheck(a);
    } else {
      setCheck([...check, i]);
    }
  };

  return <InProgressFoodCard handleRadio={ handleRadio } check={ check } />;
}

export default FoodsInProgress;
