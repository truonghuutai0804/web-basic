const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quanlysinhvien', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

try {
  sequelize.authenticate();
  console.log('Connection SQL has been successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize
