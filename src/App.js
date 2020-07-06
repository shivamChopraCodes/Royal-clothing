import React from 'react';
import { Switch , Route } from 'react-router-dom';
import Homepage from './pages/homepage.component'

function HatsPage(){
  return (
    <div>
      <h1>HATS PAGE!</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <Route exact path='/' component= {Homepage} />
      <Route  path='/shop/hats' component= {HatsPage} />
    </div>
  );
}

export default App;
