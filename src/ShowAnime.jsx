
import React, { useState , useEffect } from 'react';
import "./App.css";

function ShowAnime({ anime }) {
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(true);

  useEffect(() => {
    setIsSynopsisOpen(true);
  }, [anime]);


  if (Object.keys(anime).length === 0) {
    return <div></div>;
  } else {
    return (
      <div>

        <div className="Box-Anime-Element">
          <h1 className="Title">{anime.title}</h1>
          <img src={anime.images.jpg.image_url} alt="Anime Poster" />
        </div>
        {anime.synopsis.length !== 0 && (
          <div className="Box-Anime-Element">
            <div className="Synopsis">
              {(anime.synopsis.length > 300 && isSynopsisOpen) ? (
                <>
                  <p className="synopsis-gradient">{anime.synopsis.substring(0,250)}</p>
                  <button type="button" className="moreSysnopsis" onClick={() =>setIsSynopsisOpen(false)}>...</button>
                </>
              ) : (
                <p>{anime.synopsis}</p>
              )}
            </div>
          </div>
        )}
        <div className="Box-Anime-Element">
          <div className="data-Anime">
            {anime.episodes && (
              <p className="Episodes">{anime.episodes} episode{anime.episodes === 1 ? '' : 's'}</p>
            )}
            {anime.type && <p className="Type">{anime.type}</p>}

            {anime.score && <p className="Score">{anime.score} by {anime.scored_by} {anime.scored_by > 1 ? 'people' : 'person'} </p>}

            {anime.status && <p className="Status">{anime.status}</p>}

            {anime.rank && <p className="Rank">Rank: {anime.rank}</p>}

            {anime.aired.string && (
              <p className="Start_Date">Aired on: {anime.aired.string}</p>
            )}

            {anime.rating && <p className="Rating">{anime.rating}</p>}

            {anime.trailer.url && (
              <a href={anime.trailer.url} target="_blank">View Trailer</a>
            )}

          </div>
        </div>
      </div>
    );
  }

}

export default ShowAnime;
