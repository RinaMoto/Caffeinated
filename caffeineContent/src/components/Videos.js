import React, { useEffect, useState } from 'react';
import Tooltip from "@mui/material/Tooltip";

function Videos() {
    const [videos, setVideos] =  useState("");
  
    const findVideos = async () => {
        const response = await fetch(`/`, {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Set-Cookie': 'SameSite=Strict; Secure'
               }
        })
        const data = await response.json();
        setVideos(data); 
    }
    
    useEffect(() => {
        findVideos();
    }, []);
    
   
    return ( 
            <> 
                <div className="grid place-items-center"> 
                <div className="">
                <div className="m-0">
                    <div className="flex flex-wrap justify-center m-0 w-screen h-96">
                        {
                            (videos || []).map((drink , i) => (
                                <div className="video-responsive m-0 p-10" key={i}>
                                <iframe
                                width="560" 
                                height="315" 
                                src={drink.url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                />
                            </div>
                            ))
                        }
                        
                    </div> 
                    </div>
                    </div>
                </div>
                  
            </>
    );
  
};



export default Videos;