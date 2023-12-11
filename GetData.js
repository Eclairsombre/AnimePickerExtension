import fs from 'fs';
import fetch from 'node-fetch';



const data = JSON.parse(fs.readFileSync('./output.json', 'utf8'));

var outputArray = [];

const setOutputArray = (newData) => {
  outputArray.push(...newData);
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function App() {
  async function fetchData() {
    for (let i = 1; i <= 1033; i++) {
      const requestURL = `https://api.jikan.moe/v4/anime?page=${i}`;
      try {
        const response = await fetch(requestURL);
        const data = await response.json();
        setOutputArray(data.data);
        console.log(i);
        await delay(1000);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  await fetchData();


  if (outputArray.length > 0) {
    const jsonData = JSON.stringify(outputArray, null, 2); // Using 2 spaces for indentation
    const outputFile = 'output.json';

    fs.writeFile(outputFile, jsonData, 'utf8', err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('JSON data has been written to', outputFile);
      }
    });
  }

  console.log(outputArray.length)
}



function filterAnimeByGenre(animeList, genresToFilter) {
  // Check if the animeList and genresToFilter are provided
  if (!animeList || !genresToFilter || !Array.isArray(animeList) || !Array.isArray(genresToFilter)) {
    console.error('Invalid input. Please provide valid arrays.');
    return [];
  }

  // Filter the anime based on the specified genres
  const filteredAnime = animeList.filter(anime => {
    // Check if the anime has genres property
    if (anime.genres && Array.isArray(anime.genres)) {
      // Check if all of the specified genres are included in the anime's genres
      return genresToFilter.every(genre => anime.genres.some(animeGenre => animeGenre.name === genre));
    }

    return false;
  });

  return filteredAnime;
}

const genresToFilter = ['Action', 'Sci-Fi', 'Adventure', 'Comedy', 'Drama'];
const filteredAnime = filterAnimeByGenre(data, genresToFilter);
console.log(filteredAnime);