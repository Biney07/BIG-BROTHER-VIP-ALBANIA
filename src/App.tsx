import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar/Navbar';
import Momentet from './Pages/Momentet';
import Footer from './Components/Footer/Footer';
import Dancers from './Pages/Dancers';



function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/Videos">
          <Momentet />
        </Route>
        <Route path="/Dancers">
          <Dancers />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
