module.exports = (sequelize, DataTypes) => {
  return sequelize.define('birthday', {

    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    bdMonth: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    bdDay: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};
