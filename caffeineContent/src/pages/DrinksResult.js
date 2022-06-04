import React, {useState, useEffect, lazy} from 'react';
import { Link } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import Spinner from 'react-spinner-material';

const DrinksResult = ({ drinks }) => {
    const result = Object.keys(drinks).map((key) => drinks[key]);

    const [imageReady, setImageReady] = useState(false);
    const [place, setPlace] = useState(result);
    const [caf, setCaf] = useState([]);

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
      
    const findCaffeine = async () => {
        const drinksListed = { place }
        const response = await fetch(`/results`, {
            method: 'POST',
            body: JSON.stringify(drinksListed),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );    
        if (response.status === 200) {
            const json = await response.json();
            await sleep(100);
            setCaf(json)
            setImageReady(true)
        }
        else {
            alert(`Failed to fetch data, status code = ${response.status}`);
        }
    }

    useEffect(() => {
        findCaffeine();
    });

    return (
        <>{imageReady === true ? 
        <div className="px-10"> 
            <h1 className="text-4xl content-center font-normal m-10 text-orange-800">Caffeine content levels</h1>
            
            <div className={`sm:grid sm:grid-cols-1 md:flex md:flex-grow justify-center m-0`}> 
            {caf.map((caf, i) => {
                return(
                <div className="h-fit md:w-full xl:max-h-5/6 sm:max-w-full m-4 outline outline-orange-400 overflow overflow-hidden rounded-lg shadow-lg">
                    <div className="px-6 py-4 items-center rounded-lg" key={i}>
                        <p className="font-bold text-xl mb-2">{caf.name}</p>
                        <p className="text-gray-700 text-base">{caf.Caffeine}mg per 8oz cup</p>
                        <img src={require(`../images/${caf.url}`)} className="mx-auto mt-auto" alt={`coffee drink of ${caf.url}`} />
                    </div>
                </div>)
            })}
            </div>
            <Link to="/">
                <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-4 mr-2 mb-2"><AiFillHome className="inline-block mb-0.5 mr-1" />Home</button>
            </Link>
            <Link to="/drinks">
                <button className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-4 mr-2 mb-2">Compare other drinks</button>
            </Link>
            
        </div>
        : <div className="grid place-content-center gap-1 my-20"><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div>}
        </>
    );
};

export default DrinksResult;