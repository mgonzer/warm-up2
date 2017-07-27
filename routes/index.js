var express = require('express');
var router = express.Router();
const queries = require('../db/queries')

router.get('/:id/cigars', (req, res) => {
  queries.getAll(req.params.id).then(cigars => {
    res.json(cigars)
  })
})

router.get('/:id/cigars/:cigarID', (req, res) => {
  queries.getOne(req.params.id, req.params.cigarID)
  .then(cigar=>{
    res.json(cigar)
  })
})

router.post('/:id/cigars', (req, res)=>{
  queries.createOne(req.params.id, req.body)
  .then(results=>{
    res.send(results[0])
  })
})

router.put('/:id/cigars/:cigarID', (req, res)=>{
  queries.updateCigar(req.params.cigarID, req.body)
  .then(cigar=>{
    res.json(cigar[0])
  })
})

router.delete('/:id/cigars/:cigarID', (req, res) => {
  queries.deleteCigar(req.params.cigarID)
  .then(()=>{
    res.json({
      deleted: true
    })
  })
})

module.exports = router;
