import React, {useState, useEffect} from 'react';
import { useNavigate, Route } from 'react-router-dom';
import SearchBar from "../components/SearchContent.js";

const Drinks = ({ drinksToSet }) => {
    let navigate = useNavigate();
    const [select, setSelect] = useState([]);
    const [info, setInfo] = useState("");

    const clearSelect = () => {
        setSelect([]);
    };

    function handleChange(e) {
        console.log(e.target.value);
        console.log(select);
        const drink = e.target.value;
        if (select.includes(drink)) {
            setSelect(select.filter(x => !drink.includes(x)));
        }
        else if (select.length === 5) {
            alert("you can only select 5");
        }
        else {
            setSelect(prevSelected => ([...prevSelected, drink]));
        }
    }

    function submitReq() {
        if (!select.length) {
            alert("You must select at least one drink")
        }
        else {
            drinksToSet(select);
            navigate('/results'); 
        }
  
    }

    const findPlaces = async () => {
        const response = await fetch(`/drinks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }})
        try{
            var data = await response.json();
            setInfo(data);
        } catch (error) {
            console.log(error)
        }
        
        
    }

    useEffect(() => {
        findPlaces();
    }, []);

    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Select up to 5 drinks</h1>
            <div>
                <SearchBar data={info} handleChange={handleChange}/>
                <div>
                    <div className="mt-9" >
                        <h3 data-tooltip-target="tooltip-default" className="text-lg px-2 jusitfy-center">selected drinks 👇</h3>
                    </div>
                    <div className="flex justify-center p-4"> 
                        {
                            select.map((drink, i) => {
                                return (
                                    <button className="py-2.5 px-5 mx-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100" key={i} value={drink} onClick={e => handleChange(e)}>{drink}</button>
                            )
                        })
                        }
                    
                    </div>
                </div>
                <button   
                    className="text-white bg-red-600 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-5 mb-2"
                    onClick={clearSelect}>
                    Clear selected
                </button> 
                <button   
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick ={() => submitReq()}>
                    Compare caffeine content
                </button>   
            </div>
        </div>
    );
};

export default Drinks;