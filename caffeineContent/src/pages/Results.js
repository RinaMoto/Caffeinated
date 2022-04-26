import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Results = ({ drinks }) => {
    const result = Object.keys(drinks).map((key) => drinks[key]);

    const [place, setPlace] = useState(result);
    const [caf, setCaf] = useState([]);

    const findCaffeine = async () => {
        const drinksListed = { place }
        const response = await fetch(`/results`, {
            method: 'PUT',
            body: JSON.stringify(drinksListed),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );    
        if (response.status === 200) {
            const json = await response.json();
            setCaf(json)
        }
        else {
            alert(`Failed to fetch data, status code = ${response.status}`);
        }
    }

    useEffect(() => {
        findCaffeine();
    });

    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Caffeine content levels</h1>
            
            <div className="grid justify-center m-1 items-center"> 
            {(caf || []).map((caf, i) => {
                return(
                <div className="max-w-sm m-4 rounded-lg bg-gray-100 shadow-lg">
                    <div className="px-6 py-4 rounded-lg" key={i}>
                        <p className="font-bold text-xl mb-2">{caf.name}</p>
                        <p className="text-gray-700 text-base">{caf.Caffeine}mg per 8oz cup</p>
                    </div>
                </div>)
            })}
            <div className="absolute left-20 top-60">
                <h3>Did you know:</h3>
                <p>up to 400 mg of caffeine a day is safe for most adults</p>
            </div>
            </div>
            <Link to="/drinks">
                <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2">Compare other drinks</button>
            </Link>
            
        </div>
    );
};

export default Results;