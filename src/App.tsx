import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
