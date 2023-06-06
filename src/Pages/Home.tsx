import React from 'react';
import './Home.css';
const Home: React.FC = () => {
  return (
    <div>
      
    <div className="header">
    <video src="../../public/bigu.mp4" autoPlay muted loop />
</div>

      <h1>Welcome to Big Brother VIP Albania</h1>
      <p>This is the home page of the Big Brother VIP Albania project.</p>

    </div>
  );
};

export default Home;
