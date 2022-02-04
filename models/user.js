module.exports = (sequelize, DataTypes) => 
  sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { underscored: true,
       tableName: 'Users',
     });
