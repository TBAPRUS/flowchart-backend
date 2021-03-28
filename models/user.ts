import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from './index';
import { UserAttributes } from "../interfaces/UserInterface";

class User extends Model implements UserAttributes {
  readonly SALT_LEN = 12;

  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  getSignedJwtToken()
  {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET as jwt.Secret, {
      expiresIn: process.env.JWT_EXPIRE
    })
  }

  async matchPassword(password: string)
  {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      is: /^\w{3,24}$/
    }
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

User.beforeCreate(async (user: User) => {
  user.password = await bcrypt.hash(user.password, user.SALT_LEN);
})

export default User;