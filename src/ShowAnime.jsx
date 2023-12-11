import "./App.css";

function ShowAnime({ anime }) {
  if (Object.keys(anime).length === 0) {
    return <div></div>;
  } else {
    return (
      <div>
        <h1 className="Title">{anime.title}</h1>
        <img src={anime.images.jpg.image_url} alt="Anime Poster" />
        <p className="Synopsis">{anime.synopsis}</p>
        <div className="InfoContainer">
          <div className="InfoLeft">
            {anime.episodes && (
              <p className="Episodes">Number Episodes : {anime.episodes}</p>
            )}
            {anime.duration && (
              <p className="Duration">Duration: {anime.duration}</p>
            )}
            {anime.popularity && (
              <p className="Popularity">Popularity: {anime.popularity}</p>
            )}
            {anime.rank && <p className="Rank">Rank: {anime.rank}</p>}
            {anime.members && (
              <p className="Members">Members: {anime.members}</p>
            )}
            {anime.favorites && (
              <p className="Favorites">Favorites: {anime.favorites}</p>
            )}
            {anime.score && <p className="Score">Score: {anime.score}</p>}
          </div>
          <div className="InfoRight">
            {anime.type && <p className="Type">Type: {anime.type}</p>}
            {anime.status && <p className="Status">Status: {anime.status}</p>}
            {anime.aired.string && (
              <p className="Start_Date">Date: {anime.aired.string}</p>
            )}

            {anime.trailer.url && (
              <a href={anime.trailer.url} target="_blank">
                View Trailer
              </a>
            )}
            {anime.source && <p className="Source">Source: {anime.source}</p>}

            {anime.scored_by && (
              <p className="Scored_By">Scored By: {anime.scored_by}</p>
            )}

            {anime.rating && <p className="Rating">Rating: {anime.rating}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowAnime;
