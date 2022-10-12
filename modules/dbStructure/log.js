module.exports = (sequelize, DataTypes) => {
  return sequelize.define('logChannel', {

    server_id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    server_name:{
      type: DataTypes.STRING
    },
    channel_id:{
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};
