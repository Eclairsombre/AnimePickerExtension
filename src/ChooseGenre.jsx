import React, { useState } from 'react';
import BoxGenre from './BoxGenre';

function ChooseGenre({ genre, allSelectedGenre, setAllGenre, research }) {

    const addGenre = (selectedGenre) => {
        if (!allSelectedGenre.includes(selectedGenre)) {
            setAllGenre([...allSelectedGenre, selectedGenre]);
        }
        else{
            setAllGenre(allSelectedGenre.filter((item) => item !== selectedGenre));
        }
    }

    if (Object.keys(genre).length !== 0) {
        return (
            <div>
                <div className="allGenre">
                    {genre.map((item) => (
                        (item.name.toLowerCase().includes(research.toLowerCase()) || research==="") ? (
                        <div className="box-genre" style={{opacity: allSelectedGenre.includes(item.name) ? 1 : 0.4}}>
                            <button className="nameGenre" onClick={() => addGenre(item.name)}>{item.name}</button>
                        </div>
                        ):(
                            null
                        )
                    ))}
                </div>
            </div>
        );
    }
    else {
        return (null);
    }
}

export default ChooseGenre;
