const path = require('path');
const router = require('express').Router();

// serve up index
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})
// serve up animals
router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'))
})
// serve up zookeepers!!
router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'))
})
// serve up index at any undefined routes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

module.exports = router;
