import React from 'react';
import { Link } from 'react-router-dom';
import {BsFillCalculatorFill} from 'react-icons/bs';
import {HiOutlineDatabase} from 'react-icons/hi';
import {FiCoffee} from 'react-icons/fi';
import Videos from '../components/Videos.js';

const HomePage = () => {

    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Home Page</h1>
            <div>
                <Link to="/drinks">
                <button 
                    type="button" 
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                    ><FiCoffee className="inline-block mr-2 mb-1"/>Compare caffeine drinks</button> 
                </Link>
                <Link to="/calculator">
                <button 
                    type="button" 
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                    ><BsFillCalculatorFill className="inline-block mr-2 mb-1" />Caffeine calculator</button>
                </Link>
                <Link to="/database">
                <button 
                    type="button" 
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                    ><HiOutlineDatabase className="inline-block mr-2 mb-1" />Caffeine Database</button>
                </Link>
                
                <Videos />
            </div>
        </div>
    );
};



export default HomePage;