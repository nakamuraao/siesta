module.exports = (sequelize, DataTypes) => {
  return sequelize.define('messageReaction', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    trigger:{
      type: DataTypes.STRING,
      allowNull: false
    },
    response:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};
