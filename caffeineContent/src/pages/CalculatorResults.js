import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';

const CalculatorResults = ({values}) => {
    const [inputValues, setInputValues] = useState("");
    console.log(inputValues);

    const findCaffeine = async () => {
        const response = await fetch(`/calculator/results`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );    
        if (response.status === 200) {
            const json = await response.json();
            setInputValues(json)
        }
        else {
            alert(`Failed to fetch data, status code = ${response.status}`);
        }
    }

    useEffect(() => {
        findCaffeine();
    }, []);
    return (
        <>
        {inputValues !== "" ?
            <div> 
                <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Calculate how much of your drink is unhealthy</h1>
                <div className="grid place-items-center"> 
                    <div className="outline outline-orange-400 w-full sm:w-1/3 mt-10 rounded shadow-lg">
                        <div className="px-6 py-4">
                            <label className="mb-4">
                                <h1 className="font-bold text-xl mb-2 mr-2">Daily Safe Maximum: </h1>
                                <p>Your maximum is {inputValues.maxServings} servings of <b>{inputValues.drink}</b> per day. {' '}
                                The serving size is {inputValues.volume} ml.</p>
                            </label>
                        </div>
                    </div>
                </div> 
                <Link to="/">
                    <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-4 mr-2 mb-2"><AiFillHome className="inline-block mb-0.5 mr-1" />Home</button>
                </Link>
                <Link to="/calculator">
                    <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-4 mr-2 mb-2">Calculate other drinks</button>
                </Link>
            </div>
        : null}
        </>
    );
};



export default CalculatorResults;