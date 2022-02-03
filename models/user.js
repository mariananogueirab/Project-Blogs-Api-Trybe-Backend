/* const validateName = {
    notEmpty: true,
    min: {
      args: 8,
    msg: '"displayName" length must be at least 8 characters long',
    },
};

const validateEmail = {
  isEmail: true,
  notEmpty: true,
  unique: {
    args: true,
    msg: 'User already registered',
  },
};

const validatePassword = {
  notEmpty: true,
  len: 6,
}; */

function User(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    displayName: { type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        min: {
          args: 8,
        msg: '"displayName" length must be at least 8 characters long',
        },
    },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
        unique: {
          args: true,
          msg: 'User already registered',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: 6,
      },
    },
    image: DataTypes.STRING,
  },
  { underscored: true,
       tableName: 'Users',
     });
  return User;
}

module.exports = User;