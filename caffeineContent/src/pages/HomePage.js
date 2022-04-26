import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Compare caffeine drinks</h1>
            <div>
                <Link to="/drinks">
                <button 
                    type="button" 
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >Let's go</button> 
                </Link>
            </div>
        </div>
    );
};



export default HomePage;