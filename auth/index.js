const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const query = require('../db/queries')


function validUser(user){
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '';

  return validEmail && validPassword;
}

router.post('/signup', (req, res, next)=> {
  if(validUser(req.body)){
    query.findUserByEmail(req.body.email)
      .then(user => {
        if(user){
          next(new Error('Email in use'))
        }else{
          const user = {
            email: req.body.email
          }
          bcrypt.hash(req.body.password, 10)
            .then((hash)=> {
              user.password = hash;
              query.createUser(user)
                .then(user=>{
                  res.json(user)
                })
          })

        }
      })

  }else{
    next(new Error('Invalid User'))
  }
})

router.post('/login', (req, res, next)=>{
  if(validUser(req.body)){
    query.findUserByEmail(req.body.email)
      .then(user=>{
        if(user){
          bcrypt.compare(req.body.password, user.password)
            .then((result)=>{
              if(result){
                res.json({
                  id: user.id,
                  name: user.name
                })
              }else{
                next(new Error('invalid user!'))
              }
            })
        }else{

        }
      })

  }else{
    next(new Error('invalid login!'))
  }
})

module.exports = router;
