const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/zookeepers')
const { zookeepers } = require('../../data/zookeepers');

router.get('/zookeepers', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
})

router.get('/zookeepers/:id', (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if(result) {
    res.json(result);
  } else {
    res.send(404);
  }
})

router.post('/zookeepers', (req, res) => {
  // set id based on the next array index
  req.body.id = zookeepers.length.toString();
  if (!validateAnimal(req.body)) {
    res.status(400).send('The data is not properly typed.')
  } else {
    // add animal to json file and array here
    const animal = createNewAnimal(req.body, zookeepers)
    res.json(animal);
  }
})

module.exports = router;
