import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hotel', 'roque1', 'ramerica123', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;4