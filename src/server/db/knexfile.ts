import * as path from 'path';

// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },
    useNullAsDefault: true,

  },

  staging: {},

  production: {}
};
