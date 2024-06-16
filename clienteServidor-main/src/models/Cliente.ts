import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model {
  public idCliente!: number;
  public nombre!: string;
  public apellido!: string;
  public telefono!: string;
  public email!: string;
  public direccion!: string;
}

Cliente.init({
  idCliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Cliente',
});


export default Cliente;
