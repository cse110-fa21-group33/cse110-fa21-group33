require('dotenv').config();

const localSQLConnection = {
  host: process.env.HOST,
  port: process.env.DATAPORT,
  user: process.env.DATAUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  timezone: 'UTC',
};

const SQLConnection = localSQLConnection;

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: SQLConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'mysql',
    connection: SQLConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
  },

};
