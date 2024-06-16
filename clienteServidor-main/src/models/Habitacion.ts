import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


class Habitacion extends Model {
  public idHabitacion!: number;
  public numHabitacion!: string;
  public tipo!: string;
  public precioXNoche!: number;
  public estado!: string;
}



Habitacion.init({
  idHabitacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numHabitacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioXNoche: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Habitacion',
});
export const crearHabitaciones = async (habitacionData: {
  idHabitacion: number,
  numHabitacion: string,
  tipo: string,
  precioXNoche: number,
  estado: string
}): Promise<void> => {
  await Habitacion.create(habitacionData);

  
}
export const obtenerHabitacion = async (idHabitacion: number) => {
    try {
      const habitacion = await Habitacion.findByPk(idHabitacion);
      return habitacion;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
export default Habitacion;
