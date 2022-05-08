"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Must Be A Valid Url",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Must Be A Valid Integer",
          },
        },
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Must Be A Valid Integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
