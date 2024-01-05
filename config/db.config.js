const debug = require('debug')('spotify-backend:database');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
  logging: false,
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    debug('Connection to the database has been established successfully.');
  } catch (error) {
    debug('Unable to connect to the database:', error);
  }
})();

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {
  debug('Database synchronized successfully.');
}).catch((error) => {
  debug('Error syncing database:', error);
});

module.exports = sequelize;
