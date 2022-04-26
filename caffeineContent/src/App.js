import coffee from './coffee1.png';
import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import Drinks from './pages/Drinks.js';
import Results from './pages/Results.js';


function App() {
  const [location, setLocation] = useState();
  const [drinks, setDrinks] = useState();
  return (
    <div className="App">
      <Router>
      <header className="App-header bg-orange-100">
        <Link to="/">
        <img src={coffee} className="h-10 m-6" alt="logo" />
        </Link>
      </header>
      <div>
        <Routes>
          <Route path='/' exact element = {<HomePage />}>
            
          </Route>
          <Route path="/drinks" element={<Drinks drinksToSet={setDrinks}/>}>
              
            </Route>
          <Route path="/results" element={<Results drinks={drinks}/>} >
          
          </Route>

          
          {/* 
          <Route path="/display-shop">

          </Route> */}
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
