const express = require('express');
const { animals } = require('./data/animals')
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array database
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON datas
app.use(express.json());

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

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    // find the path of the file
    path.join(__dirname, './data/animals.json'),
    // stringify the data from post to save it w/o editing w/ whitespaces
    JSON.stringify({ animals: animalsArray }, null, 2)
  )
  return body;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
})

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result) {
    res.json(result);
  } else {
    res.send(404);
  }
})

app.post('/api/animals', (req, res) => {
  // set id based on the next array index
  req.body.id = animals.length.toString();
  // add animal to json file and array here
  const animal = createNewAnimal(req.body, animals)
  res.json(animal);
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
})
