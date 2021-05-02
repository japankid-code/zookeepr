const express = require('express');
const { animals } = require('./data/animals')

const app = express();

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // saves as an array, places strings into array.
    if  (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    personalityTraitsArray.forEach(trait => {
      // checks personality traits agains each animal in the filtered results.
      // makes a copy of the og filtered results and checks  if it match
      // the trait in question. will keep only those that match
      // leaves us with an array of animals that have each personality trait
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      )
    })
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
})

app.listen(3001, () => {
  console.log('API server now on port 3001');
})
