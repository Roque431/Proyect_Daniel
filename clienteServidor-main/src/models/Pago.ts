import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Pago extends Model {
  public idPago!: number;
  public idReserva!: number;
  public montoTotal!: number;
  public fechaPago!: Date;
  public metodoPago!: string;
}

Pago.init({
  idPago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idReserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  montoTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  metodoPago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Pago',
});

export default Pago;
