import { Sequelize } from 'sequelize';

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD) {
  throw new Error('Not data for db')
}

export default new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});
