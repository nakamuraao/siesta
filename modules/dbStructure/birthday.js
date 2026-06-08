module.exports = (sequelize, DataTypes) => {
  return sequelize.define('birthday', {

    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    bdMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bdDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};
