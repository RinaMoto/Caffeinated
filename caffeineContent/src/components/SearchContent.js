import React, { useEffect, useState } from 'react';
import Tooltip from "@mui/material/Tooltip";

function SearchBar({ data, handleChange }) {
    
    var jsonArray = [data]

    const [input, setInput] = useState("");
    const [showMore, setShowMore] = useState(true);
    const numberOfItems = showMore && input === "" ? 10 : 40;

    const inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setInput(lowerCase);
    };
   
    return ( 
            <> 
                <div>
                <div className="grid place-items-center"> 
                <div className="outline outline-orange-400 w-2/3 h-96 overflow-y-scroll rounded shadow-lg">
                <div className="px-6 py-4">
                    <input
                        placeholder="Enter drink to search"
                        onChange={e => inputHandler(e)}
                        className="outline outline-1 sm:w-1/2 px-3 rounded-md"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-10 m-4">
                        {
                            Object.values(data).slice(0, numberOfItems).filter((post, i) => {
                                if (input === '') {
                                    return post;
                                } else if (post.name.toLowerCase().includes(input.toLowerCase())) {
                                    return post;
                                }
                            }).map((drink , i) => (
                                <div>
                                    <Tooltip title="Click to add and unadd" placement="top">
                                    <button 
                                        onClick={e => handleChange(e)}
                                        value={drink.name}
                                        key={i}
                                        className={`py-2 px-5 m-0.5 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300`}
                                    >
                                        {drink.name}</button>
                                    </Tooltip>
                                </div>
                            ))
                        }
                        {input === "" ? <button onClick={() => setShowMore(!showMore)}>{showMore ? "⬇ More" : "⬆ Less"}</button> : ""}
                    </div> 
                    </div>
                    </div>
                    </div>
            </div>
            </>
    );
  
};



export default SearchBar;