import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;

  public title!: string;

  public content!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const initPost = (sequelize: Sequelize): void => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(128),
      },
      content: {
        type: new DataTypes.STRING(128),
      },
    },
    {
      sequelize,
      tableName: 'Posts',
    },
  );
};

export { initPost };
