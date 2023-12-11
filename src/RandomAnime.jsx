import { useEffect, useState } from 'react'
import './App.css'
import ChooseGenre from './ChooseGenre.jsx'
import ShowAnime from './ShowAnime.jsx'
import LoadingSpinner from "./LoadingSpinner.jsx";
import { all } from 'axios';

function RandomAnime() {

  const [anime, setAnime] = useState({});
  const [genre, setGenre] = useState({});
  const [allSelectedGenre, setAllGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [researchBar, setResearchBar] = useState("");

  useEffect(() => {
    if (anime) {

    }
    else {
      setAnime({});
    }

  }, []);

  useEffect(() => {
    var requestURL = 'https://api.jikan.moe/v4/genres/anime';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      const temp = request.response;
      setGenre(temp.data);
    }
  }, []);


  function handleClick() {
    setAnime({});
    setIsError(false);
    setIsLoading(true);
    callApiAnime();
    setHasClicked(true);
  }


  function callApiAnime() {
    let val = false;


    var requestURL = 'https://api.jikan.moe/v4/random/anime';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        {
          const temp = request.response;
          console.log(temp.data);
          if (Object.keys(temp.data.genres).length !== 0) {
            var genres = temp.data.genres;
          }
          else {
            var genres = {};
          }

          if (Object.keys(temp.data.demographics).length !== 0) {
            var demo = temp.data.demographics;
          }
          else {
            var demo = {};
          }


          var selectedGenres = [];
          for (let i in genres) {
            selectedGenres.push(genres[i].name);
          };
          for (let i in demo) {
            selectedGenres.push(demo[i].name);
          };
          console.log(selectedGenres);
          selectedGenres.forEach(element => {
            console.log(element);
            if (allSelectedGenre.length > 0 && allSelectedGenre.includes(element) || allSelectedGenre.length == 0) {
              val = true;
            }
          });

          if (val) {
            setAnime(temp.data);
            setIsLoading(false);
          }
          else {
            callApiAnime();
          }


        }
      }
      else {
        console.error("Error sss: " + request.status);
        setErrorMessage("Nothing found try again");
        setIsLoading(false);
        setIsError(true);

      }
    }

    request.onerror = function () {
      // There was a connection error of some sort
      console.error("Connection error");
      setErrorMessage("A connection error occurred");
      setIsLoading(false);
      setIsError(true);
    };
  }


  const handleInputChange = (event) => {
    setResearchBar(event.target.value);
  };


  return (
    <div>
      <h1 className='MainTitle'>Random Anime Picker</h1>
      {!hasClicked ? (
        <>
          <input type="text" value={researchBar} onChange={handleInputChange} />
          <ChooseGenre genre={genre} allSelectedGenre={allSelectedGenre} setAllGenre={setAllGenre} research={researchBar} />
          <button className='picker' onClick={() => { setAllGenre([]); setResearchBar("") }} disabled={isLoading}>Reset</button>
          <button className='picker' onClick={handleClick} disabled={isLoading}>Search</button>
        </>
      ) : (
        <>
          <button className='reroll' onClick={handleClick} disabled={isLoading}>Reroll</button>
          <button className='back' onClick={() => setHasClicked(false)}>{'<'}</button>
          {isLoading ? <LoadingSpinner /> : <ShowAnime anime={anime} />}
          {isError ? <h1 className='error'>{errorMessage}</h1> : <div></div>}
        </>
      )}
    </div>
  );
}

export default RandomAnime;
