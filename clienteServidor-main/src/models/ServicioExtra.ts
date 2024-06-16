import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ServicioExtra extends Model {
  public idServicio!: number;
  public nombre!: string;
  public costo!: number;
}

ServicioExtra.init({
  idServicio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  costo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'ServiciosExtras',
});

export default ServicioExtra;
