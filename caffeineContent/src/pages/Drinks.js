import React, {useState, useEffect} from 'react';
import { useNavigate, Route } from 'react-router-dom';

const Drinks = ({ drinksToSet }) => {
    let navigate = useNavigate();
    const [select, setSelect] = useState("");
    const [info, setInfo] = useState();
    const [active, setActive] = useState([]);

    function handleChange(e) {
        if (select.includes(e)) {
            setSelect(prevSelected => prevSelected.filter((s) => s !== e));
            setActive(prevSelected => prevSelected.filter((s) => s !== info[e].name))
        }
        else if (select.length === 5) {
            alert("you can only select 5");
        }
        else {
            setSelect(prevSelected => ([...prevSelected, e]));
            setActive(prevSelected => ([...prevSelected, info[e].name]));
        }
        console.log(info[e].name);

    }

    function submitReq() {
        if (!active.length) {
            alert("You must select at least one drink")
        }
        else {
            drinksToSet(active);
            navigate('/results'); 
        }
  
    }

    const findPlaces = async () => {
        const response = await fetch(`/location`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }})
        const data = await response.json();
        setInfo(data);
    }

    useEffect(() => {
        findPlaces();
    }, []);

    return (
        <div> 
            <h1 className="text-4xl content-center font-normal leading-normal mt-4 mb-7 text-orange-800">Select up to 5 drinks</h1>
            <div>
                <div className="grid grid-cols-6 gap-1 m-3">
                    {(info || []).map((info, i) => {
                        return(
                        <div className="m-1" key={i}>
                            <button className={`py-2.5 px-5 m-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100`}
                                onClick={(e) => handleChange(i, e)}
                            >{info.name}</button>
                        </div>
                        )
                    })}
                </div>
                <div>
                    <div >
                        <h3 data-tooltip-target="tooltip-default" className="text-lg mb-2">selected drinks 👇</h3>
                        <h3 className="absolute right-60">tool tip: click on item again to de-select</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 justify-center p-4"> 
                        {(active || []).map((active, i) => {
                            return(
                                <p className="grid grid-cols-1" key={i}>{active}</p>
                            )
                        })}
                    </div>
                </div>
                <button   
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick ={() => submitReq()}>
                    Compare caffeine content
                </button>   
            </div>
        </div>
    );
};

export default Drinks;