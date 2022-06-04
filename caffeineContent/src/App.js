import coffee from './coffee1.png';
import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import Drinks from './pages/Drinks.js';
import Results from './pages/DrinksResult.js';
import Calculator from './pages/Calculator.js';
import CalculatorResults from './pages/CalculatorResults.js';
import Database from './pages/Database.js';

function App() {
  const [drinks, setDrinks] = useState();
  const [calculations, setCalculations] = useState({});
  
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
          <Route path="/calculator" element={<Calculator setValues={setCalculations}/>} >
          
          </Route>
          <Route path="/calculator/results" element={<CalculatorResults values={calculations}/>} >
          
          </Route>
          <Route path="/database" element={<Database />} >
          
          </Route>

      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
