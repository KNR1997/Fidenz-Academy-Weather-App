import React, { useEffect, useState } from "react";
import cities from '../../assests/cities.json';

function Home() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() =>{
    setJsonData(cities.List);
  }, []);

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default Home;
