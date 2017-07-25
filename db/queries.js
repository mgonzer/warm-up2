const knex = require('./knex')


module.exports = {
  findUserByEmail: function(email) {
    return knex('smoker').where('email', email).first()
  },
  createUser(user){
    return knex('smoker').insert(user, '*').then(users => {
      return users[0];
    })
  }

}
