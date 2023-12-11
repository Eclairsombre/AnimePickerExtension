import fs from 'fs';
import fetch from 'node-fetch';

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

App();

