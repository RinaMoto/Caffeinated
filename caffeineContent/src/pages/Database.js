import React, {useState, useEffect} from 'react';

const Database = () => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    const inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setQuery(lowerCase);
    };

    const findDrinks = async () => {
        const response = await fetch(`/database`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        try {
            var json = await response.json();
            console.log(json);
            setDrinks(json);
            setLoading(true);
            } catch {
            alert(`Failed to fetch data, status code = ${response.status}`);
        }
    }

    useEffect(() => {
        findDrinks();
    }, []);

    return (
        <>  
            {loading ?
                <div className="px-10"> 
                    <h1 className="text-4xl content-center font-normal m-10 text-orange-800">Caffeine content levels</h1>
                    <div className="grid"> 
                        <div className="outline outline-orange-400 w-full h-[40rem] overflow-y-scroll rounded shadow-lg">
                            <div className="px-6 py-4">
                            <input
                                placeholder="Enter drink to search"
                                onChange={e => inputHandler(e)}
                                className="outline outline-1 w-1/2 px-3 mb-3 rounded-md"
                            />
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Drink</th>
                                            <th className="px-6 py-3">Caffeine content (mg)</th>
                                            <th className="px-6 py-3">Volume</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {drinks.filter(drink => {
                                            if (query === "") {
                                                return drink;
                                            } else if (drink.drink.toLowerCase().includes(query.toLowerCase())) {
                                                return drink;
                                            }
                                            }).map((drink, i) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                                                    <th className="px-6 py-4">{drink.drink}</th>
                                                    <th className="px-6 py-4">{drink.content}</th>
                                                    <th className="px-6 py-4">{drink.volume}</th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default Database;