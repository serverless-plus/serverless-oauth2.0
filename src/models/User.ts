import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;

  public username!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const initUser = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(128),
      },
      password: {
        type: new DataTypes.STRING(128),
      },
    },
    {
      sequelize,
      tableName: 'Users',
    },
  );
};

export { initUser };
