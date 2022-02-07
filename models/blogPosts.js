module.exports = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define('BlogPosts', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.NUMBER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
    });
  
    BlogPosts.associate = (models) => {
      BlogPosts.belongsTo(models.User,
        { primaryKey: 'id', as: 'user' });
    };
  
    return BlogPosts;
  };