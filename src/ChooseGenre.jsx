

import React, { useState } from 'react';
import BoxGenre from './BoxGenre';

function ChooseGenre({ genre ,allSelectedGenre, setAllGenre}) {
    
    const [selectedGenre, setSelectedGenre] = useState('Action');
    

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
     
    };

    const addGenre = () => {
        if (!allSelectedGenre.includes(selectedGenre) && allSelectedGenre.length<2) {
            setAllGenre([...allSelectedGenre, selectedGenre]);
        }
    }
 

   
    

    if (Object.keys(genre).length !== 0)

    {return (
        <div>
            <div className="handleGenre">
            <p>Filter :</p>
            <select value={selectedGenre} onChange={handleGenreChange}>
                {genre.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            
            <button onClick={addGenre}>Add</button>
            </div>
            
            <div className="allGenre">
            {allSelectedGenre.map((item) => (
                    
                    <BoxGenre genre={item} allSelectedGenre={allSelectedGenre} setAllGenre={setAllGenre}/>
                    
                ))}
            </div>
        </div>
    );}
    else{
        return(<div></div>);
    }
}

export default ChooseGenre;
