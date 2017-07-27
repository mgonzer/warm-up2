var express = require('express');
var router = express.Router();
const queries = require('../db/queries')

router.get('/', (req, res) => {
  queries.getAll().then(cigars => {
    res.json(cigars)
  })
})

router.get('/:id', (req, res) => {
  queries.getOne(req.params.id)
  .then(cigar=>{
    res.json(cigar)
  })
})

router.post('/', (req, res)=>{
  queries.createOne(req.body)
  .then(results=>{
    res.send(results[0])
  })
})

router.put('/:id', (req, res)=>{
  queries.updateCigar(req.params.id, req.body)
  .then(cigar=>{
    res.json(cigar[0])
  })
})

router.delete('/:id', (req, res) => {
  queries.deleteCigar(req.params.id)
  .then(()=>{
    res.json({
      deleted: true
    })
  })
})

module.exports = router;
