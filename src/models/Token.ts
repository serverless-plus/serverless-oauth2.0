import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface TokenAttributes {
  id: number;
  token: string;
  code: string;
  user_id: number;
}

type TokenCreationAttributes = Optional<TokenAttributes, 'id'>;

export class Token extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes {
  public id!: number;

  public token!: string;

  public code!: string;

  public user_id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const initToken = (sequelize: Sequelize): void => {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: new DataTypes.TEXT(),
      },
      code: {
        type: new DataTypes.STRING(128),
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'Tokens',
    },
  );
};

export { initToken };
