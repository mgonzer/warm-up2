// Update with your config settings.

const dotenv = require('dotenv')
dotenv.config()

module.exports = {

  development: {
    client: 'pg',
    connection: "postgresql://localhost/cigars"
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
