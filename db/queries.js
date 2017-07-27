const knex = require('./knex')


module.exports = {
  findUserByEmail: function(email) {
    return knex('smoker').where('email', email).first()
  },
  createUser(user){
    return knex('smoker').insert(user, '*').then(users => {
      return users[0];
    })
  },
  getAll(){
    return knex('cigar')
  },
  getOne(id){
    return knex('cigar').where('id', id).first()
  },
  createOne(cigar){
    return knex('cigar').insert(cigar).returning('*')
  },
  updateCigar(id, cigar){
    return knex('cigar').where('id', id).update(cigar, '*')
  },
  deleteCigar(id){
    return knex('cigar').where('id', id).del()
  }

}
