import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import Async, { useAsync } from 'react-select/async';

const Calculator = ({setValues}) => {
    let navigate = useNavigate();
    const [info, setInfo] = useState();
    const [profile, setProfile] = useState({drink: "Costa Coffee", weight: "", unit: "lbs"})

    function handleChange(e) {
        const value = e.target.value;
        setProfile({
            ...profile,
            [e.target.name]: value
        })
    }

    function submitCalculations(e) {
        e.preventDefault();
        console.log(profile);
        setValues(profile);
        navigate("/calculator/results");
    }

    const findDrinks = async () => {
        const response = await fetch('/drinks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }})
        const data = await response.json();
        setInfo(data);
    }

    useEffect(() => {
        findDrinks();
    }, []);

    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-5 text-orange-800">Calculate how much of your drink is unhealthy</h1>
           {info ? 
            <form onSubmit={submitCalculations} className="grid place-items-center h-80"> 
                <div className="outline outline-orange-400 text-left rounded shadow-lg">
                    <div className="px-6 py-4">
                        <label className="flex mb-4">
                            <div className="font-bold text-xl mb-2 mr-2">Enter a drink: </div>
                                <select className="w-2/3 outline outline-orange-200 my-0 rounded-md" onChange={handleChange} name="drink" value={profile.drink}>
                                    {
                                        info.map((info, i) => {
                                            return (
                                                <option value={info.name} key={i}>{info.name}</option>
                                            )
                                        })
                                    }
                                </select>
                        </label>
                        <label className="flex">
                            <div className="font-bold text-xl mb-2 mr-2">Your weight: </div>
                            <input 
                                required
                                className="outline outline-orange-200 w-14 p-1 mx-3 rounded-md" 
                                name="weight"
                                value={profile.weight}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                            }}/>
                            <div className="text-right">
                                <input defaultChecked={profile.unit === "lbs" ? true : false} type="radio" value="lbs" name="unit" onChange={handleChange} /> Pounds {' '}
                                <input checked={profile.unit === "kg" ? true : false} type="radio" value="kg" name="unit" onChange={handleChange} /> Kilos
                            </div>
                        </label>    
                    </div>
                </div> 
                    <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Calculate
                    </button>         
                </form>
            : null}
        </div>
    );
};

export default Calculator;