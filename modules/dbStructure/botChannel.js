module.exports = (sequelize, DataTypes) => {
  return sequelize.define('botzone', {

    channel_id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};
